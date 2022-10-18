import { UserSettingsController } from "./settings/user.settings.controller";
import { UserSettingsService } from "./settings/user.settings.service";
import { UserAuthController } from "./auth/user.auth.controller";
import { UserAuthService } from "./auth/user.auth.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [
        UserAuthController,
        UserSettingsController
    ],
    providers: [
        UserAuthService,
        UserSettingsService,
    ],
})
export class UserModule {}