import { UserController } from "./controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "./providers";
import { UserService } from "./service";
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