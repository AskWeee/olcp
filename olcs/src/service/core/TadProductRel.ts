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

  async save() {
    let myObject = new TadProductRel();
    myObject.product_line_id = 1;
    myObject.product_id = 1;
    myObject.product_manager_id = 1;

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.product_rel_id);
  }

  async test() {

  }
}
