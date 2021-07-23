import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableColumn} from "../../entity/core/TadTableColumn";

@Provide()
export class TadTableColumnService {
  @InjectEntityModel(TadTableColumn)
  tableModel: Repository<TadTableColumn>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTableColumn) {

    console.log(params);
    //if (params.id === undefined || params.id.toString() === '') return null;
    if ((params.column_id) && (params.table_id)) return null

    let myResult = null;
    if (params.column_id) {
      myResult = await this.tableModel.find({column_id: params.column_id});
    } else if (params.table_id) {
      myResult = await this.tableModel.find({table_id: params.table_id});
    }

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(column: TadTableColumn) {
    return await this.tableModel.save(column);
  }

  async update(column: TadTableColumn) {
    let myObject = await this.tableModel.findOne(column.column_id);

    if (column.table_id !== null) myObject.table_id = column.table_id;
    if (column.column_name !== null) myObject.column_name = column.column_name;
    if (column.column_desc !== null) myObject.column_desc = column.column_desc;
    if (column.column_type_id !== null) myObject.column_type_id = column.column_type_id;
    if (column.data_type !== null) myObject.data_type = column.data_type;
    if (column.data_length !== null) myObject.data_length = column.data_length;
    if (column.data_default !== null) myObject.data_default = column.data_default;
    if (column.nullable_flag !== null) myObject.nullable_flag = column.nullable_flag;
    if (column.primary_flag !== null) myObject.primary_flag = column.primary_flag;
    if (column.split_flag !== null) myObject.split_flag = column.split_flag;
    if (column.repeat_flag !== null) myObject.repeat_flag = column.repeat_flag;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableColumn) {
    let myResult = null;

    if (params.column_id) {
      let myObject = await this.tableModel.findOne({column_id: params.column_id});

      myResult = await this.tableModel.remove(myObject);
    }

    return myResult;
  }
}
