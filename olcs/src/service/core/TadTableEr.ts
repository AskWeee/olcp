import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableEr} from "../../entity/core/TadTableEr";

@Provide()
export class TadTableErService {
  @InjectEntityModel(TadTableEr)
  tableModel: Repository<TadTableEr>;

  async find(params: TadTableEr) {
    if (params.er_id === undefined || params.er_id.toString() === '') return null;

    return await this.tableModel.findOne({er_id: params.er_id});
  }

  async save(params: TadTableEr) {
    let myObject = new TadTableEr();
    myObject.er_id = params.er_id;
    myObject.er_content = params.er_content;

    return await this.tableModel.save(myObject);
  }

  async update(params: TadTableEr) {
    let myObject = await this.tableModel.findOne(params.er_id);

    myObject.er_content = params.er_content;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableEr) {
    let myObject = await this.tableModel.findOne(params.er_id);

    return await this.tableModel.remove(myObject);
  }
}
