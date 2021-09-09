import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_mdd_flow')
export class TadMddFlow {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn({ type: "int" })
  uuid;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  flow_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "text" })
  flow_content;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  content_index;
}

