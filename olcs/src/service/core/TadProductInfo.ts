import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductInfo} from "../../entity/core/TadProductInfo";

@Provide()
export class TadProductInfoService {
  @InjectEntityModel(TadProductInfo)
  tableModel: Repository<TadProductInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult)
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(params: TadProductInfo) {
    let myObject = new TadProductInfo();
    myObject.product_name = params.product_name;
    myObject.product_desc = params.product_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(params: TadProductInfo) {
    let myObject = await this.tableModel.findOne(params.product_id);

    myObject.product_name = params.product_name;
    myObject.product_desc = params.product_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadProductInfo) {
    let myObject = await this.tableModel.findOne(params.product_id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
