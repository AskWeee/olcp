import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductLineInfo} from "../../entity/core/TadProductLineInfo";

@Provide()
export class TadProductLineInfoService {
  @InjectEntityModel(TadProductLineInfo)
  tableModel: Repository<TadProductLineInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult)
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_line_id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(params: TadProductLineInfo) {
    let myObject = new TadProductLineInfo();
    myObject.product_line_name = params.product_line_name;
    myObject.product_line_desc = params.product_line_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(params: TadProductLineInfo) {
    let myObject = await this.tableModel.findOne(params.product_line_id);

    myObject.product_line_name = params.product_line_name;
    myObject.product_line_desc = params.product_line_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadProductLineInfo) {
    let myObject = await this.tableModel.findOne(params.product_line_id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
