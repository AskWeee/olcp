import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_er_table')
export class TadTableErTable {

  @CreateApiPropertyDoc('')
  @PrimaryColumn({ type: "int" })
  uuid;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  er_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  table_id;
}

