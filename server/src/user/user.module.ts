import { UserRelationshipsController } from "./relationships/user.relationships.controller";
import { UserRelationshipsService } from "./relationships/user.relationships.service";
import { UserSettingsController } from "./settings/user.settings.controller";
import { UserSettingsService } from "./settings/user.settings.service";
import { UserAuthController } from "./auth/user.auth.controller";
import { UserAuthService } from "./auth/user.auth.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [
        UserAuthController,
        UserSettingsController,
        UserRelationshipsController
    ],
    providers: [
        UserAuthService,
        UserSettingsService,
        UserRelationshipsService
    ],
})
export class UserModule {}