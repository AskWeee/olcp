import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_rtkpi')
export class TadRtKpi {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  sid: number;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_id: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_exp: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_alarm: number;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_format: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_min_value: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_max_value: string;

  @CreateApiPropertyDoc('')
  @Column()
  disp_order: number;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_field: string;

  @CreateApiPropertyDoc('')
  @Column()
  baseline: number;

  @CreateApiPropertyDoc('')
  @Column()
  algorithm: number;

  @CreateApiPropertyDoc('')
  @Column()
  notes: string;

  @CreateApiPropertyDoc('')
  @Column()
  isshow: number;

  @CreateApiPropertyDoc('')
  @Column()
  baseline_flag: number;

  @CreateApiPropertyDoc('')
  @Column()
  pecdata: number;

  @CreateApiPropertyDoc('')
  @Column()
  automark: number;

  @CreateApiPropertyDoc('')
  @Column()
  used_type: number;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_gradechg_type: number;

  @CreateApiPropertyDoc('')
  @Column()
  divzerodefault: number;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_type: number;

  @CreateApiPropertyDoc('')
  @Column()
  sv_cat_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  used_info: string;
}

