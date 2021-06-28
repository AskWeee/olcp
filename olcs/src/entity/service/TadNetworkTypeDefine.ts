import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_network_type_define')
export class TadNetworkTypeDefine {

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  network_type_top: number;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  network_type: number;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  object_class: number;

  @CreateApiPropertyDoc('')
  @Column()
  network_type_top_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  network_type_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  object_name: string;
}

