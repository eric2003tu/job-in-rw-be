import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';

export class ApplicationDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  jobId: string;
  @ApiProperty({ required: false })
  coverLetter?: string;
  @ApiProperty({ required: false })
  resumeUrl?: string;
  @ApiProperty({ enum: ApplicationStatus })
  status: ApplicationStatus;
  @ApiProperty()
  createdAt: Date;
}
