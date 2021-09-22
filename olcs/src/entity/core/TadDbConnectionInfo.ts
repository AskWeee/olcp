import {EntityModel} from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_db_connection_info')
export class TadDbConnectionInfo {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  connection_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  connection_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_host: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_port: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_sid: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_username: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_password: string;

  @CreateApiPropertyDoc('')
  @Column()
  db_type: string;

  tag: {
    tableName: string
  };

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

