import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_kpi_olog_detail')
export class TadKpiOlogDetail {

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
  @Column()
  object_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  object_id: number;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  property_name: string;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  value_old: string;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  value_new: string;
}

