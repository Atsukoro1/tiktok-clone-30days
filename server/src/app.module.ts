import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MeModule } from './user/@me/@me.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: ".env"
    }),
    UserModule,
    MeModule,
    PostModule
  ]
})
export class AppModule {}
