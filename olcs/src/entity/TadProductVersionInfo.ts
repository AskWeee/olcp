import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_product_version_info')
export class TadProductVersionInfo {

  @PrimaryGeneratedColumn()
  version_id: number;

  @Column()
  product_id: number;

  @Column()
  version_name: string;

  @Column()
  version_desc: string;
}

