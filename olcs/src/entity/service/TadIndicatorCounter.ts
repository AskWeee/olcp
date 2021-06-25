import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_indicator_counter')
export class TadIndicatorCounter {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  indicator_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  counter_code: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  base_tab_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  base_tab_col_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_time_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_geo_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_tab_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_tab_col_name: string;

  @CreateApiPropertyDoc('')
  @Column({type: "datetime"})
  import_time;
}

