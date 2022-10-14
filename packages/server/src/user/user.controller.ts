import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register() {
        return await this.userService.register();
    }

    @Post('login')
    async login() {
        return await this.userService.login();
    }
}