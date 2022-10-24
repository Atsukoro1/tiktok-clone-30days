import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { MeService } from "./@me.service";

@Controller('@me')
export class MeController {
    constructor(
        private readonly service: MeService
    ) {}

    @UseGuards(AuthGuard)
    @Get('user')
    async getMe(
        @Req() req
    ) {
        return this.service.getMe(req.user);
    }
}