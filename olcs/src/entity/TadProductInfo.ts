import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_product_info')
export class TadProductInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  product_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  product_desc: string;
}

