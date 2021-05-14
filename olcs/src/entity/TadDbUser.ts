import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_db_user')
export class TadDbUser {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  product_line_id: number;

  @Column()
  user_name: string;

  @Column()
  user_desc: string;
}
