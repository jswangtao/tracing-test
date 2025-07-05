import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ResultData } from 'src/common/utils/result';
import { SysTracingEntity } from './entities/tracing.entity';
import { CreateTracingDto, UpdateTracingDto, ListTracingDto } from './dto/index';

@Injectable()
export class TracingService {
  constructor(
    @InjectRepository(SysTracingEntity)
    private readonly sysNoticeEntityRep: Repository<SysTracingEntity>,
  ) {}
  async create(createNoticeDto: CreateTracingDto) {
    await this.sysNoticeEntityRep.save(createNoticeDto);
    return ResultData.ok();
  }

  async findAll(query: ListTracingDto) {
    const entity = this.sysNoticeEntityRep.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    // if (query.tracingTitle) {
    //   entity.andWhere(`entity.tracingTitle LIKE "%${query.tracingTitle}%"`);
    // }

    // if (query.createBy) {
    //   entity.andWhere(`entity.createBy LIKE "%${query.createBy}%"`);
    // }

    // if (query.tracingType) {
    //   entity.andWhere('entity.tracingType = :tracingType', { tracingType: query.tracingType });
    // }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }

    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    const [list, total] = await entity.getManyAndCount();

    return ResultData.ok({
      list,
      total,
    });
  }

  async findOne(tracingId: number) {
    // const data = await this.sysNoticeEntityRep.findOne({
    //   where: {
    //     tracingId: tracingId,
    //   },
    // });
    // return ResultData.ok(data);
  }

  async update(updateNoticeDto: UpdateTracingDto) {
    // await this.sysNoticeEntityRep.update(
    //   {
    //     tracingId: updateNoticeDto.tracingId,
    //   },
    //   updateNoticeDto,
    // );
    // return ResultData.ok();
  }

  async remove(tracingIds: number[]) {
    // const data = await this.sysNoticeEntityRep.update(
    //   { tracingId: In(tracingIds) },
    //   {
    //     delFlag: '1',
    //   },
    // );
    // return ResultData.ok(data);
  }
}
