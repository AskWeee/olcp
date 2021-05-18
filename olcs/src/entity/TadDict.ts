import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_dict')
export class TadDict {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  type: string;

  @CreateApiPropertyDoc('')
  @Column()
  name: string;

  @CreateApiPropertyDoc('')
  @Column()
  desc: string;
}

