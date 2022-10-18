import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyCommentModule } from '../reply-comment/reply-comment.module';
import { ReplyCommentService } from '../reply-comment/reply-comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), ReplyCommentModule],
  controllers: [CommentController],
  providers: [CommentService, ReplyCommentService],
  exports: [CommentService, MongooseModule],
})
export class CommentModule {}
