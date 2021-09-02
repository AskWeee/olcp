import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_rtkpicounter')
export class TadRtKpiCounter {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  sid: number;

  @CreateApiPropertyDoc('')
  @Column()
  counter_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_field: string;

  @CreateApiPropertyDoc('')
  @Column()
  schema_id2: string;
}

