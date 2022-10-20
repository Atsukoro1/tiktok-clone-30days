import { createUserQuery, getUserByEmailQuery, updateUserSecurityQuery } from "src/queries/user.queries";
import { User } from "../user.interface";
import * as speakeasy from 'speakeasy';
import * as jwt from 'jsonwebtoken';
import { driver } from "../../main";
import { Response } from "express";
import * as argon2 from 'argon2';
import { 
    User2FAInput, 
    UserLoginInput, 
    UserRegisterInput 
} from "./user.auth.dto";
import { 
    HttpException, 
    HttpStatus, 
    Injectable 
} from "@nestjs/common";
import { randomString } from "../user.helpers";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserAuthService {
    async register(
        input: UserRegisterInput, 
        ip: String, 
        userAgent: String,
        res: Response
    ): Promise<Response | HttpException> {
        const session = driver.session();

        const found = await session.run(getUserByEmailQuery, {
            email: input.email
        });

        if(found.records.length > 0) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'User with this email already exists'
            }, HttpStatus.BAD_REQUEST);
        }

        const hashedPass = await argon2.hash(input.password, {
            saltLength: 32,
        });

        const result = await session.run(createUserQuery, {
            id: uuidv4(),
            username: input.username,
            password: hashedPass,
            lastIpAddr: ip,
            lastUserAgent: userAgent,
            email: input.email,
            emailVerified: false,
            emailVerificationCode: randomString(),
            twoFactorEnabled: false,
            twoFactorSecret: null
        });

        const token = jwt.sign(
            JSON.stringify({
                id: result.records[0].get(0).properties.id,
            }),
            process.env.JWT_SECRET
        );

        session.close();

        return res.status(HttpStatus.CREATED)
            .setHeader(
                'set-cookie',
                `token=${token}; HttpOnly; Path=/`
            )
            .json({
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully'
            })
            .end();
    }

    async login(
        input: UserLoginInput,
        ip: String,
        userAgent: String,
        res: Response
    ): Promise<Response | HttpException> {
        const session = driver.session();

        const found = await session.run(getUserByEmailQuery, {
            email: input.email
        });

        if(found.records.length == 0) throw new HttpException({
            statusCode: HttpStatus.NOT_FOUND,
            error: 'User not found'
        }, HttpStatus.NOT_FOUND);

        const foundUser: User = found.records[0].get(0).properties;

        /* TODO:
            Check if user that is trying to log in has the same 
            ip adress and user agent as the one that registered
        */
        const isPasswordValid = await argon2.verify(
            foundUser.password.toString(), 
            input.password
        );

        if(!isPasswordValid) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Invalid password'
        }, HttpStatus.BAD_REQUEST);

        const token = jwt.sign(
            JSON.stringify({
                id: foundUser.id,
            }),
            process.env.JWT_SECRET
        );

        if(foundUser.twoFactorEnabled) {
            return res.status(HttpStatus.OK)
                .setHeader(
                    'set-cookie',
                    `token=${token}; HttpOnly; Path=/`
                )
                .json({
                    statusCode: HttpStatus.OK,
                    message: '2FA is enabled, please verify your identity'
                });
        }

        await session.run(updateUserSecurityQuery, {
            id: foundUser.id,
            lastIpAddr: ip,
            lastUserAgent: userAgent
        });

        await session.close();

        return res.status(HttpStatus.OK)
            .setHeader(
                'set-cookie', 
                `token=${token}; HttpOnly; Path=/`
            )
            .json({
                statusCode: HttpStatus.OK,
                message: 'Validation successful'
            });
    }

    async twoFactorAuth(
        input: User2FAInput, 
        res: Response, 
        user: User
    ): Promise<Response | HttpException> {
        if(!user.twoFactorEnabled) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: '2FA is not enabled'
        }, HttpStatus.BAD_REQUEST);

        let validToken = speakeasy.totp.verify({
            secret: user.twoFactorSecret.toString(),
            encoding: 'base32',
            token: input.code,
            window: 1
        });

        if(!validToken) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Invalid code'
        }, HttpStatus.BAD_REQUEST); 

        const token = jwt.sign(
            JSON.stringify({
                id: user.id,
                twoFactor: true
            }),
            process.env.JWT_SECRET
        );

        return res.status(HttpStatus.OK)
            .setHeader(
                'set-cookie',
                `token=${token}; HttpOnly; Path=/`
            )
            .json({
                statusCode: HttpStatus.OK,
                message: 'Succefully authenticated using third party app!'
            });
    }
}