import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_indicator')
export class TadIndicator {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  excel_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  excel_sheet_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_object_class: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_datasource: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_level: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_code: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_definition: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_zhexp: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_enexp: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_unit: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_geo_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_time_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_memo: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_tab_name: string;

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
  kpi_exp_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_index: number;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_value_format: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_value_min: string;

  @CreateApiPropertyDoc('')
  @Column()
  kpi_value_max: string;

  @CreateApiPropertyDoc('')
  @Column({type: "datetime"})
  import_time;

  @CreateApiPropertyDoc('')
  @Column({type: "varchar", length: 1024})
  import_desc;
}

