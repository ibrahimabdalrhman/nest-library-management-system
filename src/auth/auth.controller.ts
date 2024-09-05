import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'; // Adjust import based on your guard
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Successfully logged in and received JWT token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    return this.authService.login(req.user);
  }
}
