import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_index_column')
export class TadTableIndexColumn {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  index_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  column_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  column_position: number;

  @CreateApiPropertyDoc('')
  @Column()
  descend: string;
}

