import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTablePartition} from "../../entity/TadTablePartition";

@Provide()
export class TadTablePartitionService {
  @InjectEntityModel(TadTablePartition)
  tableModel: Repository<TadTablePartition>;

  async findAll() {

    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
  }

  async find(params: TadTablePartition) {

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

  async save(params: TadTablePartition) {

    const myResult = await this.tableModel.save(params);

    console.log('save result', myResult);
    return myResult;
  }

  async update(params: TadTablePartition) {

    let myObject = await this.tableModel.findOne(params.id);

    myObject.table_id = params.table_id;
    myObject.partition_name = params.partition_name;
    myObject.high_value = params.high_value;
    myObject.partition_position = params.partition_position;
    myObject.partition_desc = params.partition_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadTablePartition) {

    //if ((params.id) && (params.table_id)) return null

    let myObject = [];
    if (params.id) {
      myObject = await this.tableModel.find({id: params.id});
    } else if (params.table_id) {
      myObject = await this.tableModel.find({table_id: params.table_id});
    }

    console.log(params, myObject);
    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
