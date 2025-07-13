import { Controller, Get, Post, Body, Patch, Param, Query, Request, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TracingService } from './tracing.service';
import { CreateTracingDto, UpdateTracingDto, ListTracingDto } from './dto/index';
import { RequirePermission } from 'src/common/decorators/require-premission.decorator';
import { ResultData } from 'src/common/utils/result';

@ApiTags('监控')
@Controller('system/tracing')
export class TracingController {
  constructor(private readonly tracingService: TracingService) {}

  @ApiOperation({
    summary: '监控-创建',
  })
  @ApiBody({
    type: String,
  })
  @Post()
  create(@Body() createConfigDto: string, @Request() req) {
    console.log('🚀🚀🚀======>>>createConfigDto,req', JSON.parse(createConfigDto));
    return this.tracingService.create(JSON.parse(createConfigDto));
  }

  @ApiOperation({
    summary: '监控-列表',
  })
  @ApiBody({
    type: ListTracingDto,
    required: true,
  })
  @RequirePermission('system:tracing:list')
  @Get('/list')
  findAll(@Query() query: ListTracingDto) {
    console.log('🚀🚀🚀======>>>query111', query);
    return this.tracingService.findAll(query);
  }

  @ApiOperation({
    summary: '监控-详情',
  })
  @RequirePermission('system:tracing:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracingService.findOne(+id);
  }

  @ApiOperation({
    summary: '监控-更新',
  })
  @RequirePermission('system:tracing:edit')
  @Put()
  update(@Body() updateNoticeDto: UpdateTracingDto) {
    return this.tracingService.update(updateNoticeDto);
  }

  @ApiOperation({
    summary: '监控-删除',
  })
  @RequirePermission('system:tracing:remove')
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const noticeIds = ids.split(',').map((id) => +id);
    return this.tracingService.remove(noticeIds);
  }
}
