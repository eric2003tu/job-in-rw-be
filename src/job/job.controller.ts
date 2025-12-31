import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JobService } from './job.service';
import type { Job } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create a job' })
  @ApiBody({ type: CreateJobDto, examples: {
    example1: {
      summary: 'Tech job',
      value: {
        title: 'Backend Developer',
        company: 'Acme Corp',
        location: 'Remote',
        description: 'Build APIs using NestJS',
        applicationMethod: { url: 'https://acme.jobs/apply' },
        salary: '100000',
        jobType: 'FULL_TIME',
        category: 'TECHNOLOGY',
        postedById: 'user-uuid',
      },
    },
  }})
  @ApiResponse({ status: 201, description: 'Job created', type: 'Job' })
  create(@Body() data: CreateJobDto): Promise<Job> {
    return this.jobService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: 'Job', isArray: true })
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job found', type: 'Job' })
  findOne(@Param('id') id: string): Promise<Job | null> {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update job' })
  @ApiBody({ type: UpdateJobDto, examples: {
    example1: {
      summary: 'Update job title',
      value: {
        title: 'Senior Backend Developer',
      },
    },
  }})
  @ApiResponse({ status: 200, description: 'Job updated', type: 'Job' })
  update(@Param('id') id: string, @Body() data: UpdateJobDto): Promise<Job> {
    return this.jobService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job' })
  @ApiResponse({ status: 200, description: 'Job deleted', type: 'Job' })
  remove(@Param('id') id: string): Promise<Job> {
    return this.jobService.remove(id);
  }
}
