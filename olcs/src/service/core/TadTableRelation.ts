import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableRelation} from "../../entity/core/TadTableRelation";

@Provide()
export class TadTableRelationService {
  @InjectEntityModel(TadTableRelation)
  tableModel: Repository<TadTableRelation>;

  async findAll() {

    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
  }

  async find(params: TadTableRelation) {

    console.log(params);
    //if (params.id === undefined || params.id.toString() === '') return null;
    //if ((params.id) && (params.s_table_id)) return null

    let myResult = [];
    if (params.id) {
       myResult = await this.tableModel.find({id: params.id});
    } else if (params.s_table_id) {
      myResult = await this.tableModel.find({s_table_id: params.s_table_id});
    }

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(params: TadTableRelation) {

    let myObject = new TadTableRelation();

    myObject.relation_type = params.relation_type;
    myObject.s_db_user_id = params.s_db_user_id;
    myObject.s_table_id = params.s_table_id;
    myObject.s_column_id = params.s_column_id;
    myObject.a_db_user_id = params.a_db_user_id;
    myObject.a_table_id = params.a_table_id;
    myObject.a_column_id = params.a_column_id;
    myObject.data_flow = params.data_flow;
    myObject.relation_desc = params.relation_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result', myResult);
    return myResult;
  }

  async update(params: TadTableRelation) {

    let myObject = await this.tableModel.findOne(params.id);

    myObject.relation_type = params.relation_type;
    myObject.s_db_user_id = params.s_db_user_id;
    myObject.s_table_id = params.s_table_id;
    myObject.s_column_id = params.s_column_id;
    myObject.a_db_user_id = params.a_db_user_id;
    myObject.a_table_id = params.a_table_id;
    myObject.a_column_id = params.a_column_id;
    myObject.data_flow = params.data_flow;
    myObject.relation_desc = params.relation_desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(params: TadTableRelation) {

    let myObject = await this.tableModel.findOne(params.id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
