import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@prisma/client';

export class JobWithAppCountDto implements Job {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  company: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  applicationMethod: object;
  @ApiProperty()
  salary: string;
  @ApiProperty()
  jobType: any;
  @ApiProperty()
  category: any;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ required: false })
  postedById: string | null;
  @ApiProperty()
  applicationsCount: number;
}
