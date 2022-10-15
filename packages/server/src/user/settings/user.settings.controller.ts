import { Body, Controller, Headers, Ip, Post, Request, UseGuards } from "@nestjs/common";
import { UserSettingsService } from "./user.settings.service";
import { UserChangePasswordInput } from "./user.settings.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user/settings')
export class UserSettingsController {
    constructor(
        private service: UserSettingsService
    ) {}

    @Post('change-password') 
    @UseGuards(AuthGuard)
    async nevim(
        @Request() req,
        @Body() input: UserChangePasswordInput,
        @Headers('user-agent') userAgent: string,
        @Ip() ip: string
    ) {
        console.log(req.user);
        return this.service.changePassword(input, userAgent, ip);
    }
}