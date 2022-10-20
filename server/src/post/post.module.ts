import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [
        PostController
    ],
    providers: [
        PostService
    ]
})
export class PostModule {}