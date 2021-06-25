import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductRel} from "../../entity/core/TadProductRel";

@Provide()
export class TadProductRelService {
  @InjectEntityModel(TadProductRel)
  tableModel: Repository<TadProductRel>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult)
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_rel_id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(params: TadProductRel) {
    let myObject = new TadProductRel();
    myObject.product_line_id = params.product_line_id;
    myObject.product_id = params.product_id;
    myObject.product_manager_id = params.product_manager_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult
  }

  async update(params: TadProductRel) {
    let myObject = await this.tableModel.findOne(params.product_rel_id);

    myObject.product_line_id = params.product_line_id;
    myObject.product_id = params.product_id;
    myObject.product_manager_id = params.product_manager_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadProductRel) {
    let myObject = await this.tableModel.findOne(params.product_rel_id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
