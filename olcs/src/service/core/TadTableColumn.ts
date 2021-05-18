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

    console.log("result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({column_id: id});

    console.log("one connection from the db: ", myResult);
    return myResult;
  }

  async save(column: TadTableColumn) {
    const myResult = await this.tableModel.save(column);

    console.log('result', myResult);
    return myResult;
  }

  async update(column: TadTableColumn) {
    let myObject = await this.tableModel.findOne(column.column_id);

    myObject.table_id = column.table_id;
    myObject.column_name = column.column_name;
    myObject.column_desc = column.column_desc;
    myObject.column_type_id = column.column_type_id;
    myObject.data_length = column.data_length;
    myObject.default_value = column.default_value;
    myObject.is_null = column.is_null;
    myObject.primary_flag = column.primary_flag;
    myObject.split_flag = column.split_flag;
    myObject.repeat_flag = column.repeat_flag;

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
