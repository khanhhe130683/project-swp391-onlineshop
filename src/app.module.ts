import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './schemas/auth/auth.module';
import { CategoryModule } from './schemas/catgegory/category.module';
<<<<<<< HEAD
import { OrderModule } from './schemas/order/order.module';
import { ProductModule } from './schemas/product/product.module';
=======
import { CommentModule } from './schemas/comment/comment.module';
import { OrderModule } from './schemas/order/order.module';
import { ProductModule } from './schemas/product/product.module';
import { ReplyCommentModule } from './schemas/reply-comment/reply-comment.module';
>>>>>>> khanhtq
import { UserModule } from './schemas/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/online_shop'),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
<<<<<<< HEAD
=======
    CommentModule,
    ReplyCommentModule,
>>>>>>> khanhtq
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
