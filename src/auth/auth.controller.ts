import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto, examples: {
    example1: {
      summary: 'Register user',
      value: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    },
  }})
  @ApiResponse({ status: 201, description: 'User registered' })
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'john@example.com' },
      password: { type: 'string', example: 'password123' },
    },
  }, examples: {
    example1: {
      summary: 'Login user',
      value: {
        email: 'john@example.com',
        password: 'password123',
      },
    },
  }})
  @ApiResponse({ status: 200, description: 'User logged in' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
