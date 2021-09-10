import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_relation')
export class TadTableRelation {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  uuid: number;

  @CreateApiPropertyDoc('')
  @Column()
  relation_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  s_db_user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  s_table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  s_column_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  a_db_user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  a_table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  a_column_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  data_flow: string;

  @CreateApiPropertyDoc('')
  @Column()
  relation_desc: string;
}

