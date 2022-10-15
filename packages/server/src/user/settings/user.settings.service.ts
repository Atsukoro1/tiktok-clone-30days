import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ChangePasswordInput, SendEmailVerifyCodeInput } from "./user.settings.dto";
import { randomString } from "../user.helpers";
import { User } from "../user.interface";
import * as nodemailer from 'nodemailer';
import { Response } from "express";
import * as argon2 from 'argon2';
import { Model } from "mongoose";

@Injectable()
export class UserSettingsService {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>,
    ) {}

    async changePassword(
        code: string,
        _id: string,
        input: ChangePasswordInput,
        res: Response
    ) {
        const found = await this.userSchema.findOne({
            emailVerificationCode: code,
            _id: _id
        });

        if(!found) {
            throw new HttpException({
                message: 'Invalid code', 
                statusCode: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        };

        const hash = await argon2.hash(input.password, {
            saltLength: 32,
        });
        await found.updateOne({
            emailVerificationCode: randomString(),
            password: hash
        });

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
        const found: User | null = await this.userSchema.findOne({
            email: input.email
        });

        if(!found) {
            throw new HttpException({
                statusCode: 404,
                message: "User with this email cannot be found!"
            }, HttpStatus.NOT_FOUND);
        };

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
                <a href="${process.env.HOST}:${process.env.PORT}/user/settings/change-password?code=${found.emailVerificationCode}&_id=${found._id}">
                    Verify your email
                </a>
            `
        });
        
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