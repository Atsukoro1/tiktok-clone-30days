import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

export class SendEmailVerifyCodeInput {
    @IsDefined()
    @IsEmail()
    @MaxLength(1024)
    email!: string;
}

export class ChangePasswordInput {
    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    password!: string;
}