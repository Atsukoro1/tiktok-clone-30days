import { UserRelationshipInput } from "./user.relationships.dto";
import { followQuery, getUserByIdQuery } from "src/queries/user.queries";
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
        return;
    }

    async block(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        return;
    }

    async unblock(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        return;
    }
}