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

  async save(params: TadModuleInfo) {
    return await this.tableModel.save(params);
  }

  async update(params: TadModuleInfo) {
    let myObject = await this.tableModel.findOne(params.module_id);

    if (params.product_id !== null) myObject.product_id = params.product_id;
    if (params.module_name !== null) myObject.module_name = params.module_name;
    if (params.module_desc !== null) myObject.module_desc = params.module_desc;
    if (params.module_leader !== null) myObject.module_leader = params.module_leader;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadModuleInfo) {
    let myObject = await this.tableModel.findOne(params.module_id);

    return await this.tableModel.remove(myObject);
  }
}
