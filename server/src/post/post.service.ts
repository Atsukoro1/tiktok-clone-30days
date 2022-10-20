import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
import { DateTime } from "neo4j-driver";
import { driver } from "src/main";
import { User } from "src/user/user.interface";
import { v4 as uuidv4 } from 'uuid';
import { 
    CommentCreateInput, 
    PostCreateInput, 
    PostInteractionInput 
} from "./post.dto";
import { 
    commentPostQuery, 
    connectAuthorToPostQuery, 
    createPostQuery,
    deleteCommentQuery,
    getPostByIdQuery, 
    getPostOrCommenAuthorQuery, 
    getPostOrCommentQuery, 
    likePostQuery,
    unlikePostQuery 
} from "src/queries/post.queries";

@Injectable() 
export class PostService {
    constructor() {}

    async deleteComment(
        input: PostInteractionInput, 
        user: User,
        res: Response
    ) {
        const session = driver.session();

        const comment = await session.run(getPostOrCommentQuery, {
            pid: input.id
        });

        if(comment.records.length === 0 || !comment.records[0].keys.includes('u')) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Comment not found'
            }, HttpStatus.NOT_FOUND)
        };

        const post = await session.run(getPostOrCommenAuthorQuery, {
            pid: input.id
        });

        if(post.records[0].get('u').properties.id !== user.id) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'You are not authorized to delete this comment'
            }, HttpStatus.UNAUTHORIZED)
        };

        await session.run(deleteCommentQuery, {
            cid: input.id
        });

        session.close();

        return res.status(HttpStatus.OK)
            .json({
                statusCode: HttpStatus.OK,
                message: "Succefully deleted this comment!",
            })
            .end();
    }

    async comment(
        input: CommentCreateInput,
        user: User,
        res: Response
    ) {
        const session = driver.session();

        const found = await session.run(getPostByIdQuery, {
            pid: input.id
        });

        if(found.records.length === 0) {
            throw new HttpException({
                message: 'Post not found',
                statusCode: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND);
        };

        await session.run(commentPostQuery, {
            uid: user.id,
            pid: input.id,
            id: uuidv4(),
            content: input.content,
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

        const post = await session.run(getPostOrCommentQuery, {
            pid: input.id
        });

        console.log(post.records[0]);
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