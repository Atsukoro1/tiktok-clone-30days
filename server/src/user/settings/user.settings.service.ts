import { randomString } from "../user.helpers";
import { User } from "../user.interface";
import * as nodemailer from 'nodemailer';
import * as speakEasy from 'speakeasy';
import { Response } from "express";
import * as argon2 from 'argon2';
import * as QRCode from 'qrcode';
import { 
    HttpException, 
    HttpStatus, 
    Injectable 
} from "@nestjs/common";
import { 
    ChangePasswordInput, 
    SendEmailVerifyCodeInput 
} from "./user.settings.dto";
import { changePasswordQuery, enable2FAquery, getUserByEmailQuery, getUserByIdQuery, set2FASecret } from "src/queries/user.queries";
import { driver } from "src/main";

@Injectable()
export class UserSettingsService {
    async verify2FA(
        user: User,
        code: string,
        res: Response
    ) {
        const session = driver.session();

        if(user.twoFactorEnabled) {
            throw new HttpException({
                statusCode: 400,
                message: "2FA is already enabled!"
            }, HttpStatus.BAD_REQUEST);
        };

        const verified = speakEasy.totp.verify({
            secret: user.twoFactorSecret.toString(),
            encoding: 'base32',
            token: code
        });

        if(!verified) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Invalid code!"
            }, HttpStatus.UNAUTHORIZED);
        };

        await session.run(enable2FAquery, {
            id: user.id
        });

        await session.close();

        return res.status(HttpStatus.OK)
            .json({
                statusCode: HttpStatus.OK,
                message: "2FA verified!"
            })
            .end();
    }


    async get2FACode(
        user: User,
        res: Response
    ) {
        const session = driver.session();

        if(user.twoFactorEnabled) {
            throw new HttpException({
                statusCode: 400,
                message: "2FA is already enabled!"
            }, HttpStatus.BAD_REQUEST);
        }

        const secret = speakEasy.generateSecret({
            name: '2FA',
            length: 20,
        });

        const qrcode = await QRCode.toDataURL(secret.otpauth_url);

        await session.run(set2FASecret, {
            id: user.id,
            twoFactorSecret: secret.base32
        });

        return res.status(200)
            .json({
                statusCode: 200,
                message: "2FA secret generated!",
                qrcode: qrcode
            });
    }

    async changePassword(
        code: string,
        _id: string,
        input: ChangePasswordInput,
        res: Response
    ) {
        const session = driver.session();

        if(!code || !_id) {
            throw new HttpException({
                statusCode: 400,
                message: "Code and _id are required!"
            }, HttpStatus.BAD_REQUEST);
        }

        const found = await session.run(getUserByIdQuery, {
            id: _id
        });

        if(found.records.length == 0) {
            throw new HttpException({
                message: 'Invalid code', 
                statusCode: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        };

        const hash = await argon2.hash(input.password, {
            saltLength: 32,
        });
        await session.run(changePasswordQuery, {
            id: found.records[0].get(0).properties.id,
            password: hash,
            emailVerificationCode: randomString()
        });
        
        session.close();

        return res.status(200)
            .json({
                statusCode: 200,
                message: 'Password changed'
            });
    }

    async sendEmailVerifyCode(
        input: SendEmailVerifyCodeInput,
        res: Response
    ): Promise<Response | HttpException> {
        const session = driver.session();

        const found = await session.run(getUserByEmailQuery, {
            email: input.email
        });

        if(found.records.length == 0) {
            throw new HttpException({
                statusCode: 404,
                message: "User with this email cannot be found!"
            }, HttpStatus.NOT_FOUND);
        };

        const foundUser: User = found.records[0].get(0).properties;

        // Create nodemailer transport
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            ...process.env.SMTP_USER && {
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            }
        });

        // Send email
        const info = await transporter.sendMail({
            from: `dornicakkuba@gmail.com`,
            to: input.email,
            subject: "Verify your email",
            text: "Verify your email",
            html: `
                <h1>Verify your email</h1>
                <p>Click on the link below to verify your email</p>
                <a href="${process.env.HOST}:${process.env.PORT}/user/settings/change-password?code=${foundUser.emailVerificationCode}&_id=${foundUser.id}">
                    Verify your email
                </a>
            `
        });
        
        session.close();
        if(info.accepted.includes(input.email)) {
            return res.status(200)
                .json({
                    statusCode: 200,
                    message: "Email verification code has been sent to your email!"
                });
        } else {
            throw new HttpException({
                statusCode: 500,
                message: "Email could not be sent!"
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}