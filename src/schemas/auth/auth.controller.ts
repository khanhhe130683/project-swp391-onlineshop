import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
<<<<<<< HEAD
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
=======
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth-login.dto';
>>>>>>> khanhtq
import { AUTH_SWAGGER_RESPONSE } from './auth.constant';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
<<<<<<< HEAD
  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
=======
  @ApiBody({
    description: 'Login',
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong pasword! Please enter again.');
>>>>>>> khanhtq
    }
    return this.authService.login(user);
  }
}
