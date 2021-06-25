import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {CreateApiPropertyDoc} from "@midwayjs/swagger";

@EntityModel('tad_product_rel')
export class TadProductRel {

  @CreateApiPropertyDoc('')
  @PrimaryGeneratedColumn()
  product_rel_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_line_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_id: number;

  @CreateApiPropertyDoc('')
  @Column()
  product_manager_id: number;
}

