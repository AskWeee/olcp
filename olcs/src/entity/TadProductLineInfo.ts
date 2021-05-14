import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_product_line_info')
export class TadProductLineInfo {

  @PrimaryGeneratedColumn()
  product_line_id: number;

  @Column()
  product_line_name: string;

  @Column()
  product_line_desc: string;
}

