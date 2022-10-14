import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserLoginInput, UserRegisterInput } from "./dto";
import { User } from "./user.interface";
import { Response } from "express";
import { Model } from "mongoose";
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
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

        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully'
        });
    }

    async login(
        input: UserLoginInput,
        ip: String,
        userAgent: String,
        res: Response
    ): Promise<Response | HttpException> {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Email already exists'
        }, HttpStatus.BAD_REQUEST);
    }
}