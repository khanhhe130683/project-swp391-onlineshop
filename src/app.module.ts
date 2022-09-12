import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './schemas/auth/auth.module';
import { CategoryModule } from './schemas/catgegory/category.module';
import { ProductModule } from './schemas/product/product.module';
import { UserModule } from './schemas/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/online_shop'),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
