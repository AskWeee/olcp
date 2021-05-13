import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('tad_db_connection_info')
export class TadDbConnectionInfo {

  @PrimaryGeneratedColumn()
  connection_id: number;

  @Column()
  connection_name: string;

  @Column()
  db_host: string;

  @Column()
  db_port: string;

  @Column()
  db_sid: string;

  @Column()
  db_username: string;

  @Column()
  db_password: string;

  @Column()
  db_type: string;
}

