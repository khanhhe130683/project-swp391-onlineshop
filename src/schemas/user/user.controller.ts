import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/shared/constants/common.constant';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const createdUser = await this.userService.create(body);
    return createdUser;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(@Query() query: QueryParamDto) {
    const condition = { isActive: true };
    if (query.search) {
      condition['name'] = query.search;
    }
    return this.userService.getAll(condition, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateInfo(@Param('id') id, @Body() body) {
    const updatedBy = id;
    const dataUpdate = {
      ...body,
      updatedBy,
    };
    return this.userService.update(id, dataUpdate);
  }
}
