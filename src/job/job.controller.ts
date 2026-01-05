
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JobService } from './job.service';
import type { Job } from '@prisma/client';
import { JobWithAppCountDto } from './dto/job-with-app-count.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplicationDto } from '../application/dto/application.dto';
import { UpdateApplicationDto } from '../application/dto/update-application.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // ================= UPDATE APPLICATION STATUS ON MY JOB =================
  @UseGuards(JwtAuthGuard)
  @Patch('applications/:applicationId/status')
  @ApiOperation({ summary: 'Update status of an application made on a job posted by the logged-in user' })
  @ApiBody({
    type: UpdateApplicationDto,
    examples: {
      example1: {
        summary: 'Update application status',
        value: {
          status: 'REVIEWED',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Application status updated', type: ApplicationDto })
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body() data: UpdateApplicationDto,
    @Request() req
  ): Promise<ApplicationDto> {
    if (!data.status) {
      throw new (await import('@nestjs/common')).BadRequestException('Status is required');
    }
    const updated = await this.jobService.updateApplicationStatusOnMyJob(
      applicationId,
      data.status,
      req.user.id
    );
    // Fix for ApplicationDto: convert nulls to undefined for coverLetter and resumeUrl
    return {
      ...updated,
      coverLetter: updated.coverLetter === null ? undefined : updated.coverLetter,
      resumeUrl: updated.resumeUrl === null ? undefined : updated.resumeUrl,
    };
  }

  // ================= CREATE =================
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a job' })
  @ApiBody({
    type: CreateJobDto,
    examples: {
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
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Job created' })
  create(@Body() data: CreateJobDto, @Request() req): Promise<Job> {
    return this.jobService.create({
      ...data,
      postedById: req.user.id,
    });
  }

  // ================= MY JOBS (MUST BE ABOVE :id) =================
  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get jobs created by the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs created by user',
    type: JobWithAppCountDto,
    isArray: true,
  })
  findMyJobs(@Request() req): Promise<JobWithAppCountDto[]> {
    return this.jobService.findByUser(req.user.id);
  }

  // ================= APPLICATIONS ON MY JOBS =================
  @UseGuards(JwtAuthGuard)
  @Get('my/applications')
  @ApiOperation({ summary: 'Get all applications made on jobs posted by the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'List of applications on jobs posted by user',
    type: Object, // Ideally, a DTO for Application with job info
    isArray: true,
  })
  async findApplicationsOnMyJobs(@Request() req) {
    return this.jobService.findApplicationsOnMyJobs(req.user.id);
  }

  // ================= GET ALL =================
  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs',
    type: JobWithAppCountDto,
    isArray: true,
  })
  findAll(): Promise<JobWithAppCountDto[]> {
    return this.jobService.findAll();
  }


  // ================= GET ONE =================
  @Get(':id')
  @ApiOperation({ summary: 'Get job details by id' })
  @ApiResponse({ status: 200, description: 'Job details', type: JobWithAppCountDto })
  async findOne(@Param('id') id: string): Promise<JobWithAppCountDto> {
    const job = await this.jobService.findOne(id);
    if (!job) {
      throw new (await import('@nestjs/common')).NotFoundException('Job not found');
    }
    return job;
  }

  // ================= UPDATE =================
  @UseGuards(JwtAuthGuard)
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
  async update(@Param('id') id: string, @Body() data: UpdateJobDto, @Request() req): Promise<Job> {
    // Only allow update if the logged-in user is the poster
    const job = await this.jobService.findOne(id);
    if (!job || job.postedById !== req.user.id) {
      // Forbidden
      throw new (await import('@nestjs/common')).ForbiddenException('You are not allowed to edit this job');
    }
    return this.jobService.update(id, data);
  }

  // ================= DELETE =================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete job' })
  @ApiResponse({ status: 200, description: 'Job deleted' })
  remove(@Param('id') id: string): Promise<Job> {
    return this.jobService.remove(id);
  }
}
