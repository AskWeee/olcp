import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_rtkpischema')
export class TadRtKpiSchema {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  schema_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  schema_ns: string;

  @CreateApiPropertyDoc('')
  @Column()
  schema_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  schema_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  schema_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  tab_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  vendor_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  object_class: number;

  @CreateApiPropertyDoc('')
  @Column()
  sub_class: number;

  @CreateApiPropertyDoc('')
  @Column()
  disp_order: number;

  @CreateApiPropertyDoc('')
  @Column()
  enable_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  calculate_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  sum_type: number;

  @CreateApiPropertyDoc('')
  @Column()
  module_wr_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  data_source_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  query_datasource: string;

  @CreateApiPropertyDoc('')
  @Column()
  interval_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  used_type: number;

  @CreateApiPropertyDoc('')
  @Column()
  with_mo: number;

  @CreateApiPropertyDoc('')
  @Column()
  filter_where: string;

  @CreateApiPropertyDoc('')
  @Column()
  task_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  counter_tab_name: string;
}

