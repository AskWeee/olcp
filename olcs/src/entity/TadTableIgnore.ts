import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_ignore')
export class TadTableIgnore {

  @PrimaryGeneratedColumn()
  table_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  desc: string;
}

