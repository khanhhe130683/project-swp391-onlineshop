import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyCommentController } from './reply-comment.controller';
import { ReplyComment, ReplyCommentSchema } from './reply-comment.schema';
import { ReplyCommentService } from './reply-comment.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ReplyComment.name, schema: ReplyCommentSchema }])],
  controllers: [ReplyCommentController],
  providers: [ReplyCommentService],
  exports: [ReplyCommentService, MongooseModule],
})
export class ReplyCommentModule {}
