import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_table')
export class TadTable {

  @PrimaryGeneratedColumn()
  table_id: number;

  @Column()
  table_name: string;

  @Column()
  table_desc: string;

  @Column()
  table_type_id: number;

  @Column()
  table_label_id: number;

  @Column()
  db_user_id: number;

  @Column()
  module_id: number;

  @Column()
  create_user_id: number;

  @Column()
  create_time: string;

  @Column()
  modify_user_id: number;

  @Column()
  modify_time: string;
}

