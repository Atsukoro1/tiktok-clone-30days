import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { DateTime, LocalTime } from "neo4j-driver";
import { driver } from "src/main";
import { connectAuthorToPostQuery, createPostQuery } from "src/queries/post.queries";
import { User } from "src/user/user.interface";
import { v4 as uuidv4 } from 'uuid';
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

        const post = {
            id: uuidv4(),
            caption: input.caption,
            tags: input.tags
        };

        await session.run(createPostQuery, post);
        await session.run(connectAuthorToPostQuery, {
            createdAt: DateTime.fromStandardDate(new Date()),
            u: user.id,
            p: post.id
        });

        await session.close();

        return res.status(200)
            .json({
                message: 'Post created',
                statusCode: 200
            })
            .end()
    }
}