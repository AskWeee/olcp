import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from 'typeorm';

@EntityModel('tad_product_rel')
export class TadProductRel {

  @PrimaryGeneratedColumn()
  product_rel_id: number;

  @Column()
  product_line_id: number;

  @Column()
  product_id: number;

  @Column()
  product_manager_id: number;
}

