import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { REPLY_COMMENT_SWAGGER_RESPONSE } from './reply-comment.constant';
import { ReplyCommentService } from './reply-comment.service';
import { CreateReplyCommentDto, UpdateReplyCommentDto } from './create-reply-comment.dto';
import { GetUser } from 'src/shared/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ReplyComment')
@ApiBearerAuth()
@Controller('reply-comments')
@UseGuards(JwtAuthGuard)
export class ReplyCommentController {
  constructor(private readonly repCommentService: ReplyCommentService) {}

  @Post()
  @ApiBody({
    description: 'Comment',
    type: CreateReplyCommentDto,
  })
  @ApiOkResponse(REPLY_COMMENT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(REPLY_COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public create(@Body() body: CreateReplyCommentDto, @GetUser() user) {
    const data = {
      ...body,
      user: user._id,
    };
    return this.repCommentService.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(REPLY_COMMENT_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(REPLY_COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public update(@Param('id') id, @Body() body: UpdateReplyCommentDto) {
    return this.repCommentService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(REPLY_COMMENT_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(REPLY_COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public delete(@Param('id') id) {
    return this.repCommentService.delete(id);
  }
}
