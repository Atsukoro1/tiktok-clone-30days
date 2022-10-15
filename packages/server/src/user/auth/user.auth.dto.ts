import { 
    IsAlphanumeric, 
    IsDefined, 
    IsEmail, 
    MaxLength, 
    MinLength 
} from "class-validator";

export class UserRegisterInput {
    @IsDefined()
    @MinLength(3)
    @MaxLength(30)
    @IsAlphanumeric()
    readonly username!: string;

    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    readonly password!: string;

    @IsDefined()
    @MaxLength(1024)
    @IsEmail()
    readonly email!: string;
}

export class UserLoginInput {
    @IsDefined()
    @IsEmail()
    @MaxLength(1024)
    readonly email!: string;

    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    readonly password!: string;
}