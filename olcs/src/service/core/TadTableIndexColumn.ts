import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableIndexColumn} from "../../entity/core/TadTableIndexColumn";

@Provide()
export class TadTableIndexColumnService {
  @InjectEntityModel(TadTableIndexColumn)
  tableModel: Repository<TadTableIndexColumn>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTableIndexColumn) {
    if ((params.id) && (params.table_id)) return null

    let myResult = null;
    if (params.id) {
       myResult = await this.tableModel.find({id: params.id});
    } else if (params.table_id) {
      myResult = await this.tableModel.find({table_id: params.table_id});
    }

    return myResult;
  }

  async save(params: TadTableIndexColumn) {
    return await this.tableModel.save(params);
  }

  async update(params: TadTableIndexColumn) {

    let myObject = await this.tableModel.findOne(params.id);

    if (params.table_id !== null) myObject.table_id = params.table_id;
    if (params.index_id !== null) myObject.index_id = params.index_id;
    if (params.index_name !== null) myObject.index_name = params.index_name;
    if (params.column_name !== null) myObject.column_name = params.column_name;
    if (params.column_position !== null) myObject.column_position = params.column_position;
    if (params.descend !== null) myObject.descend = params.descend;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableIndexColumn) {
    let myObject = [];

    if (params.id) {
      myObject = await this.tableModel.find({id: params.id});
    } else if (params.table_id) {
      myObject = await this.tableModel.find({table_id: params.table_id});
    }

    return await this.tableModel.remove(myObject);
  }
}
