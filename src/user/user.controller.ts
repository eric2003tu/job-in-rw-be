import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import type { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile with jobs and applications' })
  @ApiResponse({ status: 200, description: 'Current user profile with jobs and applications', schema: { example: {
    id: 'user-uuid',
    name: 'John Doe',
    email: 'john@example.com',
    jobs: [
      { id: 'job-uuid', title: 'Backend Developer', /* ...other job fields... */ }
    ],
    applications: [
      { id: 'app-uuid', jobId: 'job-uuid', coverLetter: '...', /* ...other app fields... */ }
    ]
  } } })
  async getProfile(@Request() req) {
    const user = await this.userService.findFullProfile(req.user.id);
    if (!user) {
      throw new (await import('@nestjs/common')).NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto, examples: {
    example1: {
      summary: 'Example user',
      value: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    },
  }})
  @ApiResponse({ status: 201, description: 'User created', type: 'User' })
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: 'User', isArray: true })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: 'User' })
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto, examples: {
    example1: {
      summary: 'Update name',
      value: {
        name: 'Jane Doe',
      },
    },
  }})
  @ApiResponse({ status: 200, description: 'User updated', type: 'User' })
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted', type: 'User' })
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}