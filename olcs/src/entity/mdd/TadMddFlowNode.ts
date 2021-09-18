import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_mdd_flow_nodes')
export class TadMddFlowNode {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn({ type: "int" })
  uuid;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  flow_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  node_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  port_top_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  port_right_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  port_bottom_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  port_left_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "float" })
  position_x;

  @CreateApiPropertyDoc('')
  @Column({ type: "float" })
  position_y;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  node_label;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  node_type;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  node_name;
}

