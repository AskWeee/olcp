import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableIndex} from "../../entity/core/TadTableIndex";

@Provide()
export class TadTableIndexService {
  @InjectEntityModel(TadTableIndex)
  tableModel: Repository<TadTableIndex>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTableIndex) {

    console.log(params);
    //if (params.id === undefined || params.id.toString() === '') return null;
    if ((params.id) && (params.table_id)) return null

    let myResult = null;
    if (params.id) {
       myResult = await this.tableModel.find({id: params.id});
    } else if (params.table_id) {
      myResult = await this.tableModel.find({table_id: params.table_id});
    }

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(params: TadTableIndex) {

    const myResult = await this.tableModel.save(params);

    console.log('save result', myResult);
    return myResult;
  }

  async update(params: TadTableIndex) {

    let myObject = await this.tableModel.findOne(params.id);

    myObject.table_id = params.table_id;
    myObject.index_name = params.index_name;
    myObject.index_type = params.index_type;
    myObject.uniqueness = params.uniqueness;
    myObject.index_desc = params.index_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadTableIndex) {
    let myResult;

    if (params.id) {
      let myObject = await this.tableModel.findOne({id: params.id});
      myResult = await this.tableModel.remove(myObject);
    } else if (params.table_id) {
      let myObject = await this.tableModel.find({table_id: params.table_id});
      myResult = await this.tableModel.remove(myObject);
    }

    return myResult;
  }
}
