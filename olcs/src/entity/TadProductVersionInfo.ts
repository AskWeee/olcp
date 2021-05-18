import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_product_version_info')
export class TadProductVersionInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  version_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  version_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  version_desc: string;
}

