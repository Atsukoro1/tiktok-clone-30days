import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
import { DateTime } from "neo4j-driver";
import { driver } from "src/main";
import { commentPostQuery, connectAuthorToPostQuery, createPostQuery, getPostByIdQuery, likePostQuery, unlikePostQuery } from "src/queries/post.queries";
import { User } from "src/user/user.interface";
import { v4 as uuidv4 } from 'uuid';
import { CommentCreateInput, PostCreateInput, PostInteractionInput } from "./post.dto";

@Injectable() 
export class PostService {
    constructor() {}

    async comment(
        input: CommentCreateInput,
        user: User,
        res: Response
    ) {
        const session = driver.session();

        await session.run(commentPostQuery, {
            uid: user.id,
            pid: input.id,
            comment: input.content,
            createdAt: DateTime.fromStandardDate(new Date())
        });

        await session.close();

        return res.status(HttpStatus.OK)
            .json({
                statusCodes: HttpStatus.OK,
                message: "Succefully commented on the post"
            })
            .end();
    }

    async unlike(
        input: PostInteractionInput,
        user: User,
        res: Response
    ) {
        const session = driver.session();

        const post = await session.run(getPostByIdQuery, {
            pid: input.id
        });

        if(post.records.length === 0) {
            return res.status(HttpStatus.NOT_FOUND)
                .json({ 
                    message: 'Post not found',
                    statusCode: HttpStatus.NOT_FOUND
                })
                .end();
        };

        await session.run(unlikePostQuery, {
            pid: input.id,
            uid: user.id
        });

        await session.close();

        return res.status(HttpStatus.OK)
            .json({
                message: 'Post unliked',
                statusCode: HttpStatus.OK
            })
            .end();
    }

    async like(
        input: PostInteractionInput,
        user: User,
        res: Response
    ) {
        const session = driver.session();

        const post = await session.run(getPostByIdQuery, {
            pid: input.id
        });

        if(post.records.length === 0) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Post not found',
                statusCode: HttpStatus.NOT_FOUND
            });
        };

        await session.run(likePostQuery, {
            createdAt: DateTime.fromStandardDate(new Date()),
            pid: input.id,
            uid: user.id
        });

        await session.close();

        return res.status(HttpStatus.OK)
            .json({
                statusCodes: HttpStatus.OK,
                message: "Succefully liked the post"
            })
            .end();
    }

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