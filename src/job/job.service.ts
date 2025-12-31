import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Job, Prisma } from '@prisma/client';
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
}
