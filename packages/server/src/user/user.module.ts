import { UserController } from "src/user/user.controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    exports: [...userProviders],
    controllers: [UserController],
    providers: [
        UserService,
        ...userProviders
    ],
})
export class UserModule {}