import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    register() {
        return this.userService.register();
    }

    @Post('login')
    login() {
        return this.userService.login();
    }
}