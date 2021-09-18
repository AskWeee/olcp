import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableErTable} from "../../entity/core/TadTableErTable";

@Provide()
export class TadTableErTableService {
  @InjectEntityModel(TadTableErTable)
  tableModel: Repository<TadTableErTable>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTableErTable) {
    if (params.er_id === null || params.er_id === undefined) return [];

    return await this.tableModel.find({er_id: params.er_id});
  }

  async save(params: TadTableErTable) {
    let myObject = new TadTableErTable();
    myObject.er_id = params.er_id;
    myObject.table_id = params.table_id;

    return await this.tableModel.save(myObject);
  }

  async update(params: TadTableErTable) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.position_x = params.position_x;
    myObject.position_y = params.position_y;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableErTable) {
    let myObject = await this.tableModel.findOne({
      er_id: params.er_id,
      table_id: params.table_id
    });

    return await this.tableModel.remove(myObject);
  }
}
