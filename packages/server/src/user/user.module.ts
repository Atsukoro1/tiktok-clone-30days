import { UserSettingsController } from "./settings/user.settings.controller";
import { UserSettingsService } from "./settings/user.settings.service";
import { UserAuthController } from "./auth/user.auth.controller";
import { UserAuthService } from "./auth/user.auth.service";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "./user.providers";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    exports: [...userProviders],
    controllers: [
        UserAuthController,
        UserSettingsController
    ],
    providers: [
        UserAuthService,
        UserSettingsService,
        ...userProviders
    ],
})
export class UserModule {}