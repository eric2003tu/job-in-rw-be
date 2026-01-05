import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Job, Prisma, ApplicationStatus } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateJobDto & { postedById: string },
  ): Promise<Job> {
    return this.prisma.job.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // ...existing code...


  async findAll(): Promise<any[]> {
    const jobs = await this.prisma.job.findMany({
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return jobs.map(job => ({
      ...job,
      applicationsCount: job._count.applications,
    }));
  }

    // Update application status if the current user is the job poster
  async updateApplicationStatusOnMyJob(
    applicationId: string,
    status: string,
    userId: string
  ) {
    // Find the application and its job
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!application) {
      throw new (await import('@nestjs/common')).NotFoundException('Application not found');
    }
    if (!application.job || application.job.postedById !== userId) {
      throw new (await import('@nestjs/common')).ForbiddenException('You are not allowed to update this application');
    }
    // Only allow status update
    const updated = await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: status as ApplicationStatus },
    });
    return updated;
  }

  async findOne(id: string): Promise<any | null> {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) return null;

    return {
      ...job,
      applicationsCount: job._count.applications,
    };
  }

  async update(
    id: string,
    data: Prisma.JobUpdateInput,
  ): Promise<Job> {
    return this.prisma.job.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string): Promise<Job> {
    return this.prisma.job.delete({
      where: { id },
    });
  }

  async findByUser(userId: string): Promise<any[]> {
    const jobs = await this.prisma.job.findMany({
      where: { postedById: userId },
      include: {
        _count: { select: { applications: true } },
      },
    });

    return jobs.map(job => ({
      ...job,
      applicationsCount: job._count.applications,
    }));
  }

  // Get all applications made on jobs posted by a specific user
  async findApplicationsOnMyJobs(userId: string) {
    // Find all jobs posted by this user
    const jobs = await this.prisma.job.findMany({
      where: { postedById: userId },
      select: { id: true },
    });
    const jobIds = jobs.map(j => j.id);
    if (jobIds.length === 0) return [];
    // Find all applications for these jobs, include job and user info
    return this.prisma.application.findMany({
      where: { jobId: { in: jobIds } },
      include: { user: true, job: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
