import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { driver } from "src/main";
import { createPostQuery } from "src/queries/post.queries";
import { User } from "src/user/user.interface";
import * as uuid from 'uuid';
import { PostCreateInput } from "./post.dto";

@Injectable() 
export class PostService {
    constructor() {}

    async create(
        input: PostCreateInput, 
        user: User, 
        res: Response
    ) {
        const session = driver.session();

        session.run(createPostQuery, {
            id: uuid.v4(),
            url: 'https://www.google.com',
            cover: 'https://www.google.com',
            caption: 'This is a caption',
            tags: ['tag1', 'tag2']
        });

        session.close();

        return 'Post created';
    }
}