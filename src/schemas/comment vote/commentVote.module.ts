import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyCommentModule } from '../reply-comment/reply-comment.module';
import { ReplyCommentService } from '../reply-comment/reply-comment.service';
import { CommentController } from './commentVote.controller';
import { Comment, CommentSchema } from './commentVote.schema';
import { CommentService } from './commentVote.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), ReplyCommentModule],
  controllers: [CommentController],
  providers: [CommentService, ReplyCommentService],
  exports: [CommentService, MongooseModule],
})
export class CommentVoteModule {}
