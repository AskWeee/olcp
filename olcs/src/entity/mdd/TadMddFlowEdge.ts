import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_mdd_flow_edges')
export class TadMddFlowEdge {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn({ type: "int" })
  uuid;

  @CreateApiPropertyDoc('')
  @Column({ type: "int" })
  flow_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  edge_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  source_node_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  source_port_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  target_port_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  target_node_id;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  edge_label;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  edge_type;

  @CreateApiPropertyDoc('')
  @Column({ type: "varchar" })
  edge_name;
}

