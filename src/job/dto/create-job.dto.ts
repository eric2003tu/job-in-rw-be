import { ApiProperty } from '@nestjs/swagger';
import { JobType, JobCategory } from '@prisma/client';
import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsObject()
  applicationMethod: object;

  @ApiProperty()
  @IsString()
  salary: string;

  @ApiProperty({ enum: JobType })
  @IsEnum(JobType)
  jobType: JobType;

  @ApiProperty({ enum: JobCategory })
  @IsEnum(JobCategory)
  category: JobCategory;

  @ApiProperty({ required: false })
  @IsOptional()
  postedById?: string;
}
