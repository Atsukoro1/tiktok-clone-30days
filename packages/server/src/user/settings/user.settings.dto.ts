import { IsDefined, MaxLength, MinLength } from "class-validator";

export class UserChangePasswordInput {
    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    readonly password!: string;

    @IsDefined()
    @MinLength(8)
    @MaxLength(1024)
    readonly newPassword!: string;
}