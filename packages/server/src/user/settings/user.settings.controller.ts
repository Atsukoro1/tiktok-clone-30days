import { Body, Controller, Post, Query, Request, Response, UseGuards } from "@nestjs/common";
import { ChangePasswordInput, SendEmailVerifyCodeInput } from "./user.settings.dto";
import { UserSettingsService } from "./user.settings.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user/settings')
export class UserSettingsController {
    constructor(
        private service: UserSettingsService
    ) {}

    @Post('enable-2fa')
    @UseGuards(AuthGuard)
    async enable2fa(
        @Request() req,
        @Response() res
    ) {
        return this.service.enable2fa(
            req.user,
            res
        );
    }

    @Post('email-code') 
    async emailCode(
        @Response() res,
        @Body() input: SendEmailVerifyCodeInput
    ) {
        return this.service.sendEmailVerifyCode(
            input, 
            res
        );
    }

    @Post('change-password')
    @UseGuards(AuthGuard)
    async changePassword(
        @Response() res,
        @Query('code') code: string,
        @Query('_id') _id: string,
        @Body() input: ChangePasswordInput
    ) {
        return this.service.changePassword(
            code, 
            _id,
            input,
            res
        );
    }
}