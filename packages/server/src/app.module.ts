import { UserAuthController } from './user/auth/controller';
import { UserAuthService } from './user/auth/service';
import { UserModule } from './user/module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: ".env"
    }),
    UserModule
  ],
  controllers: [
    UserAuthController,
  ],
  providers: [
    UserAuthService
  ],
})
export class AppModule {}
