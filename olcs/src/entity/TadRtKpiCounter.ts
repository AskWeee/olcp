import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_rtkpicounter')
export class TadRtKpiCounter {

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  schema_id: number;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  counter_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  counter_field: string;
}

