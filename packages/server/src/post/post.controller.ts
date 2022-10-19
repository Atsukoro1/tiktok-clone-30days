import { FileInterceptor } from "@nestjs/platform-express/multer";
import { AuthGuard } from "src/user/auth/auth.guard";
import { PostCreateInput } from "./post.dto";
import { PostService } from "./post.service";
import { Response } from "express";
import { 
    Body, 
    Request, 
    Controller, 
    Res, 
    UseGuards, 
    Post,
    UseInterceptors,
    UploadedFile
} from "@nestjs/common";

@Controller('post')
export class PostController {
    constructor(
        private readonly service: PostService
    ) {}

    @UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() input: PostCreateInput,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response,
        @Request() req
    ) {
        return await this.service.create(input, req.user, res);
    }
}