import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_table_er_tree')
export class TadTableErTree {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  node_zhname: string;

  @CreateApiPropertyDoc('')
  @Column()
  node_enname: string;

  @CreateApiPropertyDoc('')
  @Column()
  node_type: string;

  @CreateApiPropertyDoc('')
  @Column()
  node_parent_id: string;
}

