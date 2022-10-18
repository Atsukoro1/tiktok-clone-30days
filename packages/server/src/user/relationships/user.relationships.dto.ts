import { IsDefined, IsUUID } from "class-validator";

export class UserRelationshipInput {
    @IsDefined()
    @IsUUID()
    userId!: string;
}