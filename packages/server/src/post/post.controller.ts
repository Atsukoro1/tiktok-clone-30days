import { AuthGuard } from "src/user/auth/auth.guard";
import { CommentCreateInput, PostCreateInput, PostInteractionInput } from "./post.dto";
import { PostService } from "./post.service";
import { Response } from "express";
import { 
    Body, 
    Request, 
    Controller, 
    Res, 
    UseGuards, 
    Post,
    Delete,
    Query
} from "@nestjs/common";

@Controller('post')
export class PostController {
    constructor(
        private readonly service: PostService
    ) {}

    @UseGuards(AuthGuard)
    @Post('create')
    async create(
        @Body() input: PostCreateInput,
        @Res() res: Response,
        @Request() req
    ) {
        return await this.service.create(input, req.user, res);
    }

    @UseGuards(AuthGuard)
    @Post('comment')
    async comment(
        @Body() input: CommentCreateInput,
        @Res() res: Response,
        @Request() req
    ) {
        return await this.service.comment(input, req.user, res);
    }

    @UseGuards(AuthGuard)
    @Post('like')
    async like(
        @Body() input: PostInteractionInput,
        @Res() res: Response,
        @Request() req
    ) {
        return await this.service.like(input, req.user, res);
    }

    @UseGuards(AuthGuard)
    @Delete('like')
    async unlike(
        @Query() input: PostInteractionInput,
        @Res() res: Response,
        @Request() req
    ) {
        return await this.service.unlike(input, req.user, res);
    }
}