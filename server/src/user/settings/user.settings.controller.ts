import { UserSettingsService } from "./user.settings.service";
import { AuthGuard } from "../auth/auth.guard";
import { 
    Body, 
    Controller, 
    Post, 
    Query, 
    Request, 
    Response, 
    UseGuards 
} from "@nestjs/common";
import { 
    ChangeEmailInput,
    ChangePasswordInput, 
    ChangeUsernameInput, 
    SendEmailVerifyCodeInput 
} from "./user.settings.dto";

@Controller('user/settings')
export class UserSettingsController {
    constructor(
        private service: UserSettingsService
    ) {}

    @Post('verify-2fa')
    @UseGuards(AuthGuard)
    async verify2FA(
        @Request() req,
        @Response() res,
        @Body('code') code: string,
    ) {
        return this.service.verify2FA(
            req.user,
            code,
            res
        );
    }

    @Post('get-2fa-code')
    @UseGuards(AuthGuard)
    async getTwo2FACode(
        @Request() req,
        @Response() res
    ) {
        return this.service.get2FACode(
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

    @Post('change-email')
    async changeEmail(
        @Request() req,
        @Response() res,
        @Body() body: ChangeEmailInput
    ) {
        return this.service.changeEmail(
            req.user,
            res,
            body
        );
    }

    @Post('change_username')
    async changeUsername(
        @Request() req,
        @Response() res,
        @Body() body: ChangeUsernameInput
    ) {
        return this.service.changeUsername(
            req.user,
            res,
            body
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