import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_table_column')
export class TadTableColumn {

  @PrimaryGeneratedColumn()
  column_id: number;

  @Column()
  table_id: number;

  @Column()
  column_name: string;

  @Column()
  column_desc: string;

  @Column()
  column_type_id: number;

  @Column()
  data_length: number;

  @Column()
  default_value: string;

  @Column()
  is_null: string;

  @Column()
  primary_flag: string;

  @Column()
  split_flag: string;

  @Column()
  repeat_flag: string;

}

