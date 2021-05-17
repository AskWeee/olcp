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

  /*
let t = {
    "connection_id": 1,
    "connection_name": "test",
    "db_type": "mysql",
    "db_host": '10.12.2.104',
    "db_port": '3306',
    "db_username": 'root',
    "db_password": 'root123',
    "db_sid": 'olcdb'
  }

   */
}

