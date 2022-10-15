import { ChangePasswordInput, SendEmailVerifyCodeInput } from "./user.settings.dto";
import { Body, Controller, Post, Query, Response } from "@nestjs/common";
import { UserSettingsService } from "./user.settings.service";

@Controller('user/settings')
export class UserSettingsController {
    constructor(
        private service: UserSettingsService
    ) {}

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