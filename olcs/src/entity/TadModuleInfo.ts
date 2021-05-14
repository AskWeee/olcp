import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_module_info')
export class TadModuleInfo {

  @PrimaryGeneratedColumn()
  module_id: number;

  @Column()
  product_id: number;

  @Column()
  module_name: string;

  @Column()
  module_desc: string;

  @Column()
  module_leader: string;
}

