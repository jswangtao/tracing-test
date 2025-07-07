import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

// export enum StatusEnum {
//   STATIC = '0',
//   DYNAMIC = '1',
// }

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
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  eventType?: string;
}
