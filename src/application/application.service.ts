import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Application, Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeUrl?: string;
    status?: any;
  }): Promise<Application> {
    return this.prisma.application.create({
      data: {
        coverLetter: data.coverLetter,
        resumeUrl: data.resumeUrl,
        status: data.status,
        user: { connect: { id: data.userId } },
        job: { connect: { id: data.jobId } },
      },
    });
  }

  async findAll(): Promise<Application[]> {
    return this.prisma.application.findMany({
      include: { user: true, job: true },
    });
  }

  async findOne(id: string): Promise<Application | null> {
    return this.prisma.application.findUnique({
      where: { id },
      include: { user: true, job: true },
    });
  }

  async update(
    id: string,
    data: Prisma.ApplicationUpdateInput,
  ): Promise<Application> {
    return this.prisma.application.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Application> {
    return this.prisma.application.delete({
      where: { id },
    });
  }
}
