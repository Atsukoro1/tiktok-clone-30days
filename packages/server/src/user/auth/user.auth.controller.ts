import { Body, Controller, Ip, Post, Headers, Res, HttpException, UseGuards, Request } from "@nestjs/common";
import { User2FAInput, UserLoginInput, UserRegisterInput } from "./user.auth.dto";
import { UserAuthService } from "./user.auth.service";
import { Response } from "express";
import { AuthGuard } from "./auth.guard";

@Controller('user/auth')
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

    @Post('2fa')
    @UseGuards(AuthGuard)
    async twoFactorAuth(
        @Body() input: User2FAInput,
        @Request() req,
        @Res() res
    ): Promise<Response | HttpException> {
        return this.service.twoFactorAuth(
            input, 
            res,
            req.user
        );
    }
}