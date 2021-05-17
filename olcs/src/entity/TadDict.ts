import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_dict')
export class TadDict {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  desc: string;
}

