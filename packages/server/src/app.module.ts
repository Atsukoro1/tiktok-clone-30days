import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: ".env"
    }),
    UserModule,
    PostModule
  ]
})
export class AppModule {}
