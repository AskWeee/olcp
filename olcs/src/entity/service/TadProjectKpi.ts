import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_project_kpi')
export class TadProjectKpi {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  pid: number;

  @CreateApiPropertyDoc('')
  @Column()
  kid: number;
}

