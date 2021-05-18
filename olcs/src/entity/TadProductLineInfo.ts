import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_product_line_info')
export class TadProductLineInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  product_line_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_line_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  product_line_desc: string;
}

