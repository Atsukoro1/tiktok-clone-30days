import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { UserRelationshipsService } from "./user.relationships.service";
import { UserFetchRelationsInput, UserRelationshipInput } from "./user.relationships.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user/relationships')
export class UserRelationshipsController {
    constructor(
        private readonly service: UserRelationshipsService
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getRelationships(
        @Res() res,
        @Query() input: UserFetchRelationsInput,
        @Req() req
    ) {
        return this.service.getRelationships(res, input, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('follow')
    async follow(
        @Res() res,
        @Body() input: UserRelationshipInput,
        @Req() req
    ) {
        return this.service.follow(res, input, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('unfollow')
    async unfollow(
        @Res() res,
        @Body() input: UserRelationshipInput,
        @Req() req
    ) {
        return this.service.unfollow(res, input, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('block')
    async block(
        @Res() res,
        @Body() input: UserRelationshipInput,
        @Req() req
    ) {
        return this.service.block(res, input, req.user);
    }

    @UseGuards(AuthGuard)
    @Post('unblock')
    async unblock(
        @Res() res,
        @Body() input: UserRelationshipInput,
        @Req() req
    ) {
        return this.service.unblock(res, input, req.user);
    }
}