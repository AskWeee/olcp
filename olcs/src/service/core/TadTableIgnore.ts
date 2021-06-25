import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableIgnore} from "../../entity/core/TadTableIgnore";

@Provide()
export class TadTableIgnoreService {
  @InjectEntityModel(TadTableIgnore)
  tableModel: Repository<TadTableIgnore>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
  }

  async find(table_name: string) {
    if (table_name === undefined || table_name === '') return null;

    let myResult = await this.tableModel.findOne({table_name: table_name});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(table: TadTableIgnore) {
    let myObject = new TadTableIgnore();
    myObject.table_name = table.table_name;
    myObject.desc = table.desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result', myResult);
    return myResult;
  }

  async update(table: TadTableIgnore) {
    let myObject = await this.tableModel.findOne(table.table_name);

    myObject.table_name = table.table_name;
    myObject.desc = table.desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(table: TadTableIgnore) {
    let myObject = await this.tableModel.findOne(table.table_name);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
