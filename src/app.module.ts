import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './schemas/auth/auth.module';
import { UserModule } from './schemas/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/online_shop'), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
