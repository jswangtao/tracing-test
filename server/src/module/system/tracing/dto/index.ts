import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}
export enum TypeEnum {
  Instruct = '1',
  Tracing = '2',
}
export class CreateTracingDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 32)
  eventType: string;
}

export class UpdateTracingDto extends CreateTracingDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  tracingId: number;
}

export class ListTracingDto extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 50)
  TracingTitle?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  TracingType?: string;

  @IsOptional()
  @IsString()
  createBy?: string;
}
