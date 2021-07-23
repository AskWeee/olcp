import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductInfo} from "../../entity/core/TadProductInfo";

@Provide()
export class TadProductInfoService {
  @InjectEntityModel(TadProductInfo)
  tableModel: Repository<TadProductInfo>;

  async findAll() {
    return await this.tableModel.find();
  }

  async save(params: TadProductInfo) {
    return await this.tableModel.save(params);
  }

  async update(params: TadProductInfo) {
    let myObject = await this.tableModel.findOne(params.product_id);

    if (params.product_name !== null) myObject.product_name = params.product_name;
    if (params.product_desc !== null) myObject.product_desc = params.product_desc;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadProductInfo) {
    let myObject = await this.tableModel.findOne(params.product_id);

    return await this.tableModel.remove(myObject);
  }
}
