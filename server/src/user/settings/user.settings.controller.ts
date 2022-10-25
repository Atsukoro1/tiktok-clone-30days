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
    ChangePasswordInput, 
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