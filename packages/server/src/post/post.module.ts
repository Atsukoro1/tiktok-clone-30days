import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { postProviders } from "./post.providers";
import { PostService } from "./post.service";

@Module({
    imports: [],
    exports: [...postProviders],
    controllers: [
        PostController
    ],
    providers: [
        PostService,
        ...postProviders
    ],
})
export class PostModule {}