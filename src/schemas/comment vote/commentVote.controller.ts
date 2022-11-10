import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { COMMENT_SWAGGER_RESPONSE } from './commentVote.constant';
import { CommentService } from './commentVote.service';
import { CreateCommentDto, UpdateCommentDto } from './create-commentVote.dto';

@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBody({
    description: 'Comment',
    type: CreateCommentDto,
  })
  @ApiOkResponse(COMMENT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public create(@Body() body: CreateCommentDto, @GetUser() user) {
    const data = {
      ...body,
      user: user._id,
    };
    return this.commentService.create(data);
  }

  @ApiParam({
    name: 'productId',
    type: 'string',
    description: 'id of product',
  })
  @Get(':productId')
  @ApiOkResponse(COMMENT_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public getAll(@Param('productId') productId) {
    return this.commentService.getAll(productId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(COMMENT_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public update(@Param('id') id, @Body() body: UpdateCommentDto) {
    return this.commentService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(COMMENT_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(COMMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public delete(@Param('id') id) {
    return this.commentService.delete(id);
  }
}
