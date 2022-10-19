import { 
    IsDefined,
    IsString, 
    IsUUID, 
    Length, 
    MaxLength, 
    MinLength, 
    Validate, 
    ValidateIf
} from "class-validator";

export class PostCreateInput {
    @IsUUID(4)
    id: string;

    @IsString()
    @MinLength(1)
    @MaxLength(512)
    caption: string;

    @IsString({ each: true })
    @Length(1, 64, { each: true })
    tags: string[];
}