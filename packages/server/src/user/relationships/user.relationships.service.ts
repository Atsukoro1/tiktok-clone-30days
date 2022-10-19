import { UserRelationshipInput } from "./user.relationships.dto";
import { blockQuery, followQuery, getRelationshipsQuery, getUserByIdQuery, unblockQuery, unfollowQuery } from "src/queries/user.queries";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../user.interface";
import { Response } from "express";
import { driver } from "src/main";

@Injectable()
export class UserRelationshipsService {
    constructor() {}

    async follow(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        const session = driver.session();

        if(user.id === input.userId) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'You cannot follow yourself'
            }, HttpStatus.BAD_REQUEST);
        }

        const userToFollow = await session.run(
            getUserByIdQuery,
            { id: input.userId }
        );

        if(userToFollow.records.length == 0) {
            throw new HttpException({
                statusCode: 400,
                message: "This user cannot be found!"
            }, HttpStatus.BAD_REQUEST)
        };

        const foundUser = userToFollow.records[0].get(0).properties;

        const relationships = await session.run(
            getRelationshipsQuery,
            {
                u1: user.id,
                u2: foundUser.id
            }
        );

        let blocked = false;
        for(let i = 0; i < relationships.records.length; i++) {
            if(relationships.records[i].get(0).properties.type === 'BLOCKED') {
                blocked = true;
            }
        }

        if(blocked) {
            throw new HttpException({
                statusCode: 400,
                message: "You cannot follow this user because you have blocked them!"
            }, HttpStatus.BAD_REQUEST)
        };

        await session.run(followQuery, {
            user1: user.id.trim(),
            user2: foundUser.id.trim()
        });

        return res.status(HttpStatus.OK)
            .json({
                statusCode: HttpStatus.OK,
                message: "You are now following this user!"
            });
    }

    async unfollow(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        const session = driver.session();

        if(user.id === input.userId) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'You cannot unfollow yourself'
            }, HttpStatus.BAD_REQUEST);
        }

        await session.run(
            unfollowQuery,
            {
                user1: user.id,
                user2: input.userId
            }
        );

        session.close();

        return res.status(HttpStatus.OK)
            .json({
                statusCode: HttpStatus.OK,
                message: "Succefully unfollowed this user!"
            })
            .end();
    }

    async block(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        const session = driver.session();

        const found = await session.run(getUserByIdQuery, {
            id: input.userId
        });

        if(found.records.length == 0) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "This user cannot be found!"
            }, HttpStatus.BAD_REQUEST)
        };

        const foundUser = found.records[0].get(0).properties;

        const relationships = await session.run(getRelationshipsQuery, {
            u1: user.id,
            u2: foundUser.id
        });

        let followed = false;
        for(let i = 0; i < relationships.records.length; i++) {
            if(relationships.records[i].get(0).properties.type === 'FOLLOW') {
                followed = true;
            }
        };

        if(followed) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "You cannot block this user because you are following them!"
            }, HttpStatus.BAD_REQUEST)
        };

        await session.run(blockQuery, {
            user1: user.id,
            user2: foundUser.id
        });

        await session.close();

        return res.status(HttpStatus.OK)  
            .json({
                statusCode: HttpStatus.OK,
                message: "Succefully blocked this user!"
            })
            .end();
    }

    async unblock(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        const session = driver.session();

        const found = await session.run(getUserByIdQuery, {
            id: input.userId
        });

        if(found.records.length == 0) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "This user cannot be found!"
            }, HttpStatus.BAD_REQUEST)
        };

        const foundUser = found.records[0].get(0).properties;

        await session.run(unblockQuery, {
            user1: user.id,
            user2: foundUser.id
        });

        await session.close();

        return res.status(200)
            .json({
                statusCode: HttpStatus.OK,
                message: "Succefully unblocked this user!"
            })
            .end();
    }
}