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

  async save(name: string, tel_no: string, email_addr: string, work_addr: string) {
    let myObject = new TadProductManagerInfo();

    myObject.product_manager_name = name;
    myObject.tel_no = tel_no;
    myObject.email_addr = email_addr;
    myObject.work_addr = work_addr;

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.product_manager_id);
  }

  async update(id: number, name: string, tel_no: string, email_addr: string, work_addr: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.product_manager_name = name;
    myObject.tel_no = tel_no;
    myObject.email_addr = email_addr;
    myObject.work_addr = work_addr;

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
