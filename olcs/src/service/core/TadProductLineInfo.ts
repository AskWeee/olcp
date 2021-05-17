import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductLineInfo} from "../../entity/TadProductLineInfo";

@Provide()
export class TadProductLineInfoService {
  @InjectEntityModel(TadProductLineInfo)
  tableModel: Repository<TadProductLineInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("result = ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_line_id: id});

    console.log("result = ", myResult);
    return myResult;
  }

  async save(name: string, desc: string) {
    let myObject = new TadProductLineInfo();
    myObject.product_line_name = name;
    myObject.product_line_desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async update(id: number, name: string, desc: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.product_line_name = name;
    myObject.product_line_desc = desc;

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
