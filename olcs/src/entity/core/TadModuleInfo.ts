import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_module_info')
export class TadModuleInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  module_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  module_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  module_desc: string;

  @CreateApiPropertyDoc('')
  @Column()
  module_leader: string;
}

