import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_kpi_olog')
export class TadKpiOlog {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  user_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  event_time: string;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  operation: string;

  @CreateApiPropertyDoc('')
  @Column()
  object_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  object_id: number;
}

