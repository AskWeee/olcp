import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadModuleInfo} from "../../entity/core/TadModuleInfo";

@Provide()
export class TadModuleInfoService {
  @InjectEntityModel(TadModuleInfo)
  tableModel: Repository<TadModuleInfo>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({module_id: id});

    return myResult;
  }

  async save(params: TadModuleInfo) {
    let myObject = new TadModuleInfo();

    myObject.product_id = params.product_id;
    myObject.module_name = params.module_name;
    myObject.module_desc = params.module_desc;
    myObject.module_leader = params.module_leader;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(params: TadModuleInfo) {
    let myObject = await this.tableModel.findOne(params.module_id);

    myObject.product_id = params.product_id;
    myObject.module_name = params.module_name;
    myObject.module_desc = params.module_desc;
    myObject.module_leader = params.module_leader;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadModuleInfo) {
    let myObject = await this.tableModel.findOne(params.module_id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
