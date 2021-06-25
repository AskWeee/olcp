import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_column')
export class TadTableColumn {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  column_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  column_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  column_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  column_type_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  data_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  data_length: number;

  @CreateApiPropertyDoc('')
  @Column()
  data_default: string;

  @CreateApiPropertyDoc('')
  @Column()
  nullable_flag: string;

  @CreateApiPropertyDoc('')
  @Column()
  primary_flag: string;

  @CreateApiPropertyDoc('')
  @Column()
  split_flag: string;

  @CreateApiPropertyDoc('')
  @Column()
  repeat_flag: string;

}

