import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductVersionInfo} from "../../entity/TadProductVersionInfo";

@Provide()
export class TadProductVersionInfoService {
  @InjectEntityModel(TadProductVersionInfo)
  tableModel: Repository<TadProductVersionInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({version_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadProductVersionInfo();
    myObject.product_id = 1;
    myObject.version_name = "预言版本";
    myObject.version_desc = "预言版本";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.version_id);
  }

  async test() {

  }
}
