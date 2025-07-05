import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracingService } from './tracing.service';
import { TracingController } from './tracing.controller';
import { SysTracingEntity } from './entities/tracing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysTracingEntity])],
  controllers: [TracingController],
  providers: [TracingService],
})
export class TracingModule {}
