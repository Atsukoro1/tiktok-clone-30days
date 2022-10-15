import { UserAuthController } from "./auth/controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "./auth/providers";
import { UserAuthService } from "./auth/service";
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