import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_olc_event')
export class TadOlcEvent {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  uuid: number;

  @CreateApiPropertyDoc('')
  @Column()
  type: string;

  @CreateApiPropertyDoc('')
  @Column()
  title: string;

  @CreateApiPropertyDoc('')
  @Column()
  desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  status: string;

  @CreateApiPropertyDoc('')
  @Column()
  customer: string;

  @CreateApiPropertyDoc('')
  @Column()
  developer: string;

  @CreateApiPropertyDoc('')
  @Column()
  time_created: string;

  @CreateApiPropertyDoc('')
  @Column()
  time_closed: string;
}

