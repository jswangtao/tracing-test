import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base';

@Entity('sys_tracing', {
  comment: '监控表',
})
export class SysTracingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'tracing_id', comment: '监控ID' })
  public tracingId: number;

  @Column({ type: 'varchar', name: 'event_type', length: 32, default: '', comment: '事件类型' })
  public eventType: string;

  @Column({ type: 'varchar', name: 'trigger_page_url', length: 255, default: '', comment: '触发页面URL' })
  public triggerPageUrl: string;

  @Column({ type: 'timestamp', name: 'send_time', default: null, comment: '事件发送时间' })
  public sendTime: Date;

  @Column({ type: 'timestamp', name: 'trigger_time', default: null, comment: '事件发生时间' })
  public triggerTime: Date;

  @Column({ type: 'varchar', name: 'err_message', length: 255, default: '', comment: '错误信息' })
  public errMessage: string;

  @Column({ type: 'text', name: 'err_stack', comment: '完整错误信息' })
  public errStack: string;

  @Column({ type: 'int', name: 'line', default: null, comment: '错误行' })
  public line: number;

  @Column({ type: 'int', name: 'col', default: null, comment: '错误列' })
  public col: number;

  @Column({ type: 'longblob', name: 'record_screen', default: null, comment: '录屏base64' })
  public recordScreen: Buffer;
}
