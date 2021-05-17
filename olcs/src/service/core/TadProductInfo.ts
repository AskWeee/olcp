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

  async save(name: string, desc: string) {
    let myObject = new TadProductInfo();
    myObject.product_name = name;
    myObject.product_desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('result', myResult);
    return myResult;
  }

  async update(id: number, name: string, desc: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.product_name = name;
    myObject.product_desc = desc;

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
