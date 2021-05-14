import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_product_manager_info')
export class TadProductManagerInfo {

  @PrimaryGeneratedColumn()
  product_manager_id: number;

  @Column()
  product_manager_name: string;

  @Column()
  tel_no: string;

  @Column()
  email_addr: string;

  @Column()
  work_addr: string;
}

