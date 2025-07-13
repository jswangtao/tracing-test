import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

// {"baseInfo":{"clientHeight":1221,"clientWidth":1072,"colorDepth":24,"pixelDepth":24,"deviceId":"t_13500537-d49afc58-25fe17f7d2467999","screenWidth":2560,"screenHeight":1440,"vendor":"Google Inc.","platform":"MacIntel","userUuid":"","sdkUserUuid":"d9046758f7b1fdb5d2ba3af1e3254696","ext":{},"appName":"nest-admin","appCode":"","pageId":"13500567-ccf9aa2d-225547020cbaf3b0","sessionId":"s_13500567-cc81e113-6e1704d22591958e","sdkVersion":"2.0.9","ip":"183.226.246.251","sendTime":1752155418916},"eventInfo":[{"initiatorType":"img","transferSize":5963,"encodedBodySize":5663,"decodedBodySize":5663,"duration":5.2,"startTime":47448.3,"fetchStart":47448.3,"domainLookupStart":47449.5,"domainLookupEnd":47449.5,"connectStart":47449.5,"connectEnd":47449.7,"requestStart":47449.8,"responseStart":47452.7,"responseEnd":47453.5,"eventType":"performance","eventId":"resource","requestUrl":"http://localhost:8888/src/assets/logo/logo.png","triggerTime":1752155417915,"triggerPageUrl":"http://localhost:8888/system/menu","sendTime":1752155418916}]}

// 设备基础信息baseInfo
export class BaseInfoDto {
  appName?: string;
  appCode?: string;
  sendTime?: number;
}
// 事件信息eventInfo
export class EventInfoItemDto {
  eventType?: string;
  eventId?: string;
  requestUrl?: string;
  triggerTime?: number;
  triggerPageUrl?: string;
  sendTime?: number;
}

export class CreateTracingDto {
  @IsOptional()
  baseInfo?: BaseInfoDto;
  @IsOptional()
  eventInfo?: EventInfoItemDto[];
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
