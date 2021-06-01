import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table')
export class TadTable {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  table_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  table_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  table_type_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  table_label_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  db_user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  module_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  create_user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  create_time: string;

  @CreateApiPropertyDoc('')
  @Column()
  modify_user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  modify_time: string;

  @CreateApiPropertyDoc('')
  @Column()
  partition_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  partition_column: string;
}

