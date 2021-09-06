import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_mdd_flow')
export class TadMddFlow {

  @CreateApiPropertyDoc('')
  @PrimaryColumn({ type: "int" })
  mdd_flow_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "blob" })
  mdd_flow_content;
}

