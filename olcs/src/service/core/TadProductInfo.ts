import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductInfo} from "../../entity/TadProductInfo";

@Provide()
export class TadProductInfoService {
  @InjectEntityModel(TadProductInfo)
  tableModel: Repository<TadProductInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadProductInfo();
    myObject.product_name = "低代码平台";
    myObject.product_desc = "低代码平台";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.product_id);
  }

  async test() {

  }
}
