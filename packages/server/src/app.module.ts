import { UserController } from './user/controller';
import { UserService } from './user/service';
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
    UserController,
  ],
  providers: [
    UserService
  ],
})
export class AppModule {}
