import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_product_manager_info')
export class TadProductManagerInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  product_manager_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_manager_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  tel_no: string;

  @CreateApiPropertyDoc('')
  @Column()
  email_addr: string;

  @CreateApiPropertyDoc('')
  @Column()
  work_addr: string;
}

