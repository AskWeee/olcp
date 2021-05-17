import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductRel} from "../../entity/TadProductRel";

@Provide()
export class TadProductRelService {
  @InjectEntityModel(TadProductRel)
  tableModel: Repository<TadProductRel>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_rel_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save(product_line_id: number, product_id: number, product_manager_id: number) {
    let myObject = new TadProductRel();
    myObject.product_line_id = product_line_id;
    myObject.product_id = product_id;
    myObject.product_manager_id = product_manager_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult
  }

  async update(id: number, product_line_id: number, product_id: number, product_manager_id: number) {
    let myObject = await this.tableModel.findOne(id);

    myObject.product_line_id = product_line_id;
    myObject.product_id = product_id;
    myObject.product_manager_id = product_manager_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myObject = await this.tableModel.findOne(id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async test() {

  }
}
