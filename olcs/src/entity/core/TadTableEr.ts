import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_er')
export class TadTableEr {

  @CreateApiPropertyDoc('')
  @PrimaryColumn({ type: "int" })
  er_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "blob" })
  er_content;
}

