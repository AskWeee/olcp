import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_partition')
export class TadTablePartition {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  table_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  partition_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  high_value: string;

  @CreateApiPropertyDoc('')
  @Column()
  partition_position: number;

  @CreateApiPropertyDoc('')
  @Column()
  partition_desc: string;
}

