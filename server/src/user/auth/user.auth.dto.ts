import { 
    IsAlphanumeric, 
    IsDefined, 
    IsEmail, 
    IsOptional, 
    MaxLength, 
    MinLength 
} from "class-validator";

export class User2FAInput {
    @IsDefined()
    code!: string;
}

export class UnifiedAuthInput {
    @IsOptional()
    @MinLength(3)
    @MaxLength(30)
    @IsAlphanumeric()
    readonly username?: string;

    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    readonly password!: string;

    @IsDefined()
    @MaxLength(1024)
    @IsEmail()
    readonly email!: string;
}