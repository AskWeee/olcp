import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_vendor_name')
export class TadVendorName {

  @CreateApiPropertyDoc('')
  @PrimaryColumn()
  type: number;

  @CreateApiPropertyDoc('')
  @Column()
  vendor_text: string;

  @CreateApiPropertyDoc('')
  @Column()
  zh_name: string;
}

