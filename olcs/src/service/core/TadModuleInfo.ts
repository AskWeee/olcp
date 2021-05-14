import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadModuleInfo} from "../../entity/TadModuleInfo";

@Provide()
export class TadModuleInfoService {
  @InjectEntityModel(TadModuleInfo)
  tableModel: Repository<TadModuleInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({module_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadModuleInfo();
    myObject.product_id = 1;
    myObject.module_name = "自研软件产品管理";
    myObject.module_desc = "自研软件产品管理";
    myObject.module_leader = "李博源";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.module_id);
  }

  async test() {

  }
}
