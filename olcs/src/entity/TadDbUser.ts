import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_db_user')
export class TadDbUser {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  user_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_line_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  user_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  user_desc: string;
}
