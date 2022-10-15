import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserLoginInput, UserRegisterInput } from "./user.auth.dto";
import { User } from "../user.interface";
import * as jwt from 'jsonwebtoken';
import { Response } from "express";
import { Model } from "mongoose";
import * as argon2 from 'argon2';

@Injectable()
export class UserAuthService {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>
    ) {}

    async register(
        input: UserRegisterInput, 
        ip: String, 
        userAgent: String,
        res: Response
    ): Promise<Response | HttpException> {
        // Check if a user with the same email already exists
        if(await this.userSchema.findOne({ email: input.email })) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'Email already exists'
            }, HttpStatus.BAD_REQUEST);
        }

        const hashedPass = await argon2.hash(input.password, {
            saltLength: 32,
        });

        const newUser = new this.userSchema({
            username: input.username,
            password: hashedPass,
            email: input.email,
            lastUserAgent: userAgent,
            lastIpAddr: ip
        });

        const saved = await newUser.save();
        if(saved.errors) throw new Error('Failed to register user');

        const token = jwt.sign(
            JSON.stringify({
                _id: saved._id,
            }),
            process.env.JWT_SECRET
        );

        console.log(token);

        return res.status(HttpStatus.CREATED)
            .setHeader(
                'set-cookie',
                `token=${token}; HttpOnly; Path=/`
            )
            .json({
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully'
            })
    }

    async login(
        input: UserLoginInput,
        ip: String,
        userAgent: String,
        res: Response
    ): Promise<Response | HttpException> {
        const foundUser = await this.userSchema.findOne({ 
            email: input.email 
        });

        if(!foundUser) throw new HttpException({
            statusCode: HttpStatus.NOT_FOUND,
            error: 'User not found'
        }, HttpStatus.NOT_FOUND);

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

        // Update the user agent and ip address to current values
        foundUser.lastIpAddr = ip;
        foundUser.lastUserAgent = userAgent;

        await foundUser.save();

        const token = jwt.sign(
            JSON.stringify({
                _id: foundUser._id,
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
                message: 'Validation successful'
            });
    }
}