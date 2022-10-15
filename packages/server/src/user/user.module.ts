import { UserAuthController } from "./auth/user.auth.controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "./user.provicers.ts";
import { UserAuthService } from "./auth/user.auth.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    exports: [...userProviders],
    controllers: [UserAuthController],
    providers: [
        UserAuthService,
        ...userProviders
    ],
})
export class UserModule {}