import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Job, Prisma } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateJobDto): Promise<Job> {
    return this.prisma.job.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Job[]> {
    return this.prisma.job.findMany();
  }

  async findOne(id: string): Promise<Job | null> {
    return this.prisma.job.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.JobUpdateInput): Promise<Job> {
    return this.prisma.job.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Job> {
    return this.prisma.job.delete({ where: { id } });
  }
}
