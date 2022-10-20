import { IsDefined, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class UserRelationshipInput {
    @IsDefined()
    @IsUUID()
    userId!: string;
}

export enum RelationType {
    FOLLOW = "0",
    FOLLOWING = "1",
    BLOCK = "2",
}

export class UserFetchRelationsInput {
    @IsDefined()
    @IsUUID()
    userId!: string;

    @IsOptional()
    @IsString()
    type?: RelationType;

    @IsNumber()
    @Min(1)
    @IsOptional()
    @Max(2048)
    page?: number;
}