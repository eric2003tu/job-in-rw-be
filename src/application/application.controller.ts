import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import type { Application } from '@prisma/client';
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
  @ApiResponse({ status: 201, description: 'Application submitted', type: 'Application' })
  create(@Body() data: CreateApplicationDto): Promise<Application> {
    return this.applicationService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 200, description: 'List of applications', type: 'Application', isArray: true })
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({ status: 200, description: 'Application found', type: 'Application' })
  findOne(@Param('id') id: string): Promise<Application | null> {
    return this.applicationService.findOne(id);
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
  @ApiResponse({ status: 200, description: 'Application updated', type: 'Application' })
  update(@Param('id') id: string, @Body() data: UpdateApplicationDto): Promise<Application> {
    return this.applicationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted', type: 'Application' })
  remove(@Param('id') id: string): Promise<Application> {
    return this.applicationService.remove(id);
  }
}
