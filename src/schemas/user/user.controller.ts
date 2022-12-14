import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from '../../shared/constants/common.constant';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { Roles } from '../../shared/decorator/roles.decorator';
import { QueryParamDto } from '../../shared/dto/query-params.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ChangePasswordDto } from './change-password.dto';
import { CreateUserDto, UpdateUserDto } from './create-user.dto';
import { ForgotPasswordDto } from './forgot-password.dto';
import { USER_SWAGGER_RESPONSE } from './user.constant';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_WRONG_PASSWORD)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_CONFIRM_PASSWORD)
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordDto, @GetUser() user) {
    const checkuser = await this.userService.getById(user._id);
    const isMatchPassword = await bcrypt.compare(body.oldPassword, checkuser.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Old password is incorrect!');
    }
    if (body.newPassword !== body.confirmPassword) {
      throw new BadRequestException('New password and Confirm password dont match');
    }
    return this.userService.changePassword(user._id, body);
  }

  @ApiBody({
    description: 'User',
    type: CreateUserDto,
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body['password'] = hashPassword;
    const createdUser = await this.userService.create(body);
    return createdUser;
  }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(@Query() query: QueryParamDto) {
    const condition = { isActive: true };
    const search = {};
    if (query.search) {
      search['key'] = query.search;
    }
    return this.userService.getAll(condition, search, query);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of user',
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.GET_USER_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of user',
  })
  @ApiBody({
    description: 'Update user by admin',
    type: UpdateUserDto,
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Patch(':id')
  async updateUser(@Param('id') id, @Body() body: UpdateUserDto, @GetUser() user) {
    const updatedBy = user._id;
    const dataUpdate = {
      ...body,
      updatedBy,
    };
    return this.userService.update(id, dataUpdate);
  }

  @ApiBody({
    description: 'Update user by user',
    type: UpdateUserDto,
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateInfo(@Body() body: UpdateUserDto, @GetUser() user) {
    const updatedBy = user._id;
    const dataUpdate = {
      ...body,
      updatedBy,
    };
    return this.userService.update(user._id, dataUpdate);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of user',
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Delete(':id')
  async inActive(@Param('id') id) {
    return this.userService.delete(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of user',
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.FORGOT_PASSWORD_SUCCESS)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.userService.forgotPassword(body.email);
  }
}
