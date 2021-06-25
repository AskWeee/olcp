import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_index')
export class TadTableIndex {

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
  index_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  uniqueness: string;

  @CreateApiPropertyDoc('')
  @Column()
  index_desc: string;
}

