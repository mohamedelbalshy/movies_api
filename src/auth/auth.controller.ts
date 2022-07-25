import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Register Success Response',
    schema: { example: { accessToken: 'accessToken' } },
  })
  signUp(@Body() loginDto: LoginDto) {
    return this.authService.signUp(loginDto);
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Login Success Response',
    schema: { example: { accessToken: 'accessToken' } },
  })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}
