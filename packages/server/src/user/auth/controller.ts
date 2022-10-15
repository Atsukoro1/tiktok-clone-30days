import { Body, Controller, Ip, Post, Headers, Res, HttpException } from "@nestjs/common";
import { UserLoginInput, UserRegisterInput } from "./dto";
import { UserAuthService } from "./service";
import { Response } from "express";

@Controller('user')
export class UserAuthController {
    constructor(private service: UserAuthService) {}

    @Post('register')
    async register(
        @Body() input: UserRegisterInput,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
        @Res() res: Response
    ): Promise<Response | HttpException> {
        return await this.service.register(input, ip, userAgent, res);
    }

    @Post('login')
    async login(
        @Body() input: UserLoginInput,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
        @Res() res: Response
    ): Promise<Response | HttpException> {
        return await this.service.login(input, ip, userAgent, res);
    }
}