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

  async save(name: string, desc: string, leader: string) {
    let myObject = new TadModuleInfo();
    myObject.module_name = name;
    myObject.module_desc = desc;
    myObject.module_leader = leader;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async update(id: number, name: string, desc: string, leader: string) {
    let myObject = await this.tableModel.findOne(id);
    myObject.module_name = name;
    myObject.module_desc = desc;
    myObject.module_leader = leader;

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
