import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './dto/application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Apply for a job' })
  @ApiBody({ type: CreateApplicationDto, examples: {
    example1: {
      summary: 'Example application',
      value: {
        userId: 'user-uuid',
        jobId: 'job-uuid',
        coverLetter: 'I am excited to apply!',
        resumeUrl: 'https://resume.com/user.pdf',
        status: 'PENDING',
      },
    },
  }})
  @ApiResponse({ status: 201, description: 'Application submitted', type: ApplicationDto })
  create(@Body() data: CreateApplicationDto): Promise<ApplicationDto> {
    return this.applicationService.create(data) as any;
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 200, description: 'List of applications', type: ApplicationDto, isArray: true })
  findAll(): Promise<ApplicationDto[]> {
    return this.applicationService.findAll() as any;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({ status: 200, description: 'Application found', type: ApplicationDto })
  findOne(@Param('id') id: string): Promise<ApplicationDto | null> {
    return this.applicationService.findOne(id) as any;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update application' })
  @ApiBody({ type: UpdateApplicationDto, examples: {
    example1: {
      summary: 'Update status',
      value: {
        status: 'REVIEWED',
      },
    },
  }})
  @ApiResponse({ status: 200, description: 'Application updated', type: ApplicationDto })
  update(@Param('id') id: string, @Body() data: UpdateApplicationDto): Promise<ApplicationDto> {
    return this.applicationService.update(id, data) as any;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted', type: ApplicationDto })
  remove(@Param('id') id: string): Promise<ApplicationDto> {
    return this.applicationService.remove(id) as any;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get applications made by the logged-in user' })
  @ApiResponse({ status: 200, description: 'List of applications made by user', type: ApplicationDto, isArray: true })
  findMyApplications(@Request() req): Promise<ApplicationDto[]> {
    return this.applicationService.findByUser(req.user.id) as any;
  }
}
