import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableColumn} from "../../entity/TadTableColumn";

@Provide()
export class TadTableColumnService {
  @InjectEntityModel(TadTableColumn)
  tableModel: Repository<TadTableColumn>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
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
    const myResult = await this.tableModel.save(column);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(column: TadTableColumn) {
    let myObject = await this.tableModel.findOne(column.column_id);

    myObject.table_id = column.table_id;
    myObject.column_name = column.column_name;
    myObject.column_desc = column.column_desc;
    myObject.column_type_id = column.column_type_id;
    myObject.data_type = column.data_type;
    myObject.data_length = column.data_length;
    myObject.data_default = column.data_default;
    myObject.nullable_flag = column.nullable_flag;
    myObject.primary_flag = column.primary_flag;
    myObject.split_flag = column.split_flag;
    myObject.repeat_flag = column.repeat_flag;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadTableColumn) {
    //if ((params.column_id) && (params.table_id)) return null

    let myObject = [];
    if (params.column_id) {
      myObject = await this.tableModel.find({column_id: params.column_id});
    } else if (params.table_id) {
      myObject = await this.tableModel.find({table_id: params.table_id});
    }

    console.log(params, myObject);
    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
