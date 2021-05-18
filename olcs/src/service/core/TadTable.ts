import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTable} from "../../entity/TadTable";
import {TadTableColumn} from "../../entity/TadTableColumn";

@Provide()
export class TadTableService {
  @InjectEntityModel(TadTable)
  tableModel: Repository<TadTable>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({table_id: id});

    console.log("one connection from the db: ", myResult);
    return myResult;
  }

  async save(table: TadTable) {

    const myResult = await this.tableModel.save(table);

    console.log('result', myResult);
    return myResult;
  }

  async update(table: TadTable) {
    let myObject = await this.tableModel.findOne(table.table_id);

    myObject.table_name = table.table_name;
    myObject.table_desc = table.table_desc;
    myObject.table_type_id = table.table_type_id;
    myObject.table_label_id = table.table_label_id;
    myObject.db_user_id = table.db_user_id;
    myObject.module_id = table.module_id;
    myObject.create_user_id = table.create_user_id;
    myObject.create_time = table.create_time;
    myObject.modify_user_id = table.modify_user_id;
    myObject.modify_time = table.modify_time;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myResult = null;

    let myObject = await this.tableModel.findOne(id);

    if (myObject !== undefined) {
      await this.tableModel.remove(myObject);

      myResult = await this.tableModel.createQueryBuilder()
        .delete()
        .from(TadTableColumn)
        .where("table_id = :tid", {tid: id})
        .execute();

      console.log('result = ', myResult);
    }

    return myResult;
  }

  async test() {

  }
}
