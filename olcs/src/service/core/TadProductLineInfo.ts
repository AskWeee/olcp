import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductLineInfo} from "../../entity/core/TadProductLineInfo";

@Provide()
export class TadProductLineInfoService {
  @InjectEntityModel(TadProductLineInfo)
  tableModel: Repository<TadProductLineInfo>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({product_line_id: id});

    return myResult;
  }

  async save(params: TadProductLineInfo) {
    return await this.tableModel.save(params);
  }

  async update(params: TadProductLineInfo) {
    let myObject = await this.tableModel.findOne(params.product_line_id);

    if (params.product_line_name !== null) myObject.product_line_name = params.product_line_name;
    if (params.product_line_desc !== null) myObject.product_line_desc = params.product_line_desc;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadProductLineInfo) {
    let myObject = await this.tableModel.findOne(params.product_line_id);

    return await this.tableModel.remove(myObject);
  }
}
