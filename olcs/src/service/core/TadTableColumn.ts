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

  async save(table_id: number,
             name: string,
             desc: string,
             column_type_id: number,
             data_length: number,
             default_value: string,
             is_null: string,
             primary_flag: string,
             split_flag: string,
             repeat_flag: string) {
    let myObject = new TadTableColumn();

    myObject.table_id = table_id;
    myObject.column_name = name;
    myObject.column_desc = desc;
    myObject.column_type_id = column_type_id;
    myObject.data_length = data_length;
    myObject.default_value = default_value;
    myObject.is_null = is_null;
    myObject.primary_flag = primary_flag;
    myObject.split_flag = split_flag;
    myObject.repeat_flag = repeat_flag;

    const myResult = await this.tableModel.save(myObject);

    console.log('result', myResult);
    return myResult;
  }

  async update(id: number,
               table_id: number,
               name: string,
               desc: string,
               column_type_id: number,
               data_length: number,
               default_value: string,
               is_null: string,
               primary_flag: string,
               split_flag: string,
               repeat_flag: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.table_id = table_id;
    myObject.column_name = name;
    myObject.column_desc = desc;
    myObject.column_type_id = column_type_id;
    myObject.data_length = data_length;
    myObject.default_value = default_value;
    myObject.is_null = is_null;
    myObject.primary_flag = primary_flag;
    myObject.split_flag = split_flag;
    myObject.repeat_flag = repeat_flag;

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
