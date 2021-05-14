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
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_line_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadProductLineInfo();
    myObject.product_line_name = "OSS产品线";
    myObject.product_line_desc = "OSS产品线";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.product_line_id);
  }

  async test() {

  }
}
