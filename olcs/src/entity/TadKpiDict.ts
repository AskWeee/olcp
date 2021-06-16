import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_kpi_dict')
export class TadKpiDict {

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  type: number;

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  id: number;

  @CreateApiPropertyDoc('')
  @Column()
  type_name: string;

  @CreateApiPropertyDoc('')
  @Column()
  type_name_en: number;

  @CreateApiPropertyDoc('')
  @Column()
  txt: string;

  @CreateApiPropertyDoc('')
  @Column()
  txt_en: string;

}

