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

  async save(name: string,
             desc: string,
             table_type_id: number,
             table_label_id: number,
             db_user_id: number,
             module_id: number,
             create_user_id: number,
             create_time: string,
             modify_user_id: number,
             modify_time: string) {
    let myObject = new TadTable();

    myObject.table_name = name;
    myObject.table_desc = desc;
    myObject.table_type_id = table_type_id;
    myObject.table_label_id = table_label_id;
    myObject.db_user_id = db_user_id;
    myObject.module_id = module_id;
    myObject.create_user_id = create_user_id;
    myObject.create_time = create_time;
    myObject.modify_user_id = modify_user_id;
    myObject.modify_time = modify_time;

    const myResult = await this.tableModel.save(myObject);

    console.log('result', myResult);
    return myResult;
  }

  async update(id: number,
               name: string,
               desc: string,
               table_type_id: number,
               table_label_id: number,
               db_user_id: number,
               module_id: number,
               create_user_id: number,
               create_time: string,
               modify_user_id: number,
               modify_time: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.table_name = name;
    myObject.table_desc = desc;
    myObject.table_type_id = table_type_id;
    myObject.table_label_id = table_label_id;
    myObject.db_user_id = db_user_id;
    myObject.module_id = module_id;
    myObject.create_user_id = create_user_id;
    myObject.create_time = create_time;
    myObject.modify_user_id = modify_user_id;
    myObject.modify_time = modify_time;

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
