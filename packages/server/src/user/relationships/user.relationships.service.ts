import { UserRelationshipInput } from "./user.relationships.dto";
import { HttpException, Injectable } from "@nestjs/common";
import { User } from "../user.interface";

@Injectable()
export class UserRelationshipsService {
    constructor() {}

    async follow(
        res: Response, 
        input: UserRelationshipInput, 
        user: User
    ): Promise<HttpException | Response> {
        return;
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