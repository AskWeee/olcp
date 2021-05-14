import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductManagerInfo} from "../../entity/TadProductManagerInfo";

@Provide()
export class TadProductManagerInfoService {
  @InjectEntityModel(TadProductManagerInfo)
  tableModel: Repository<TadProductManagerInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_manager_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadProductManagerInfo();
    myObject.product_manager_name = "金博";
    myObject.tel_no = "13801381380";
    myObject.email_addr = "admin@boco.com.cn";
    myObject.work_addr = "北京";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.product_manager_id);
  }

  async test() {

  }
}
