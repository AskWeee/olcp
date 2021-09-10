import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTableRelation} from "../../entity/core/TadTableRelation";

@Provide()
export class TadTableRelationService {
  @InjectEntityModel(TadTableRelation)
  tableModel: Repository<TadTableRelation>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTableRelation) {
    let myResult = [];

    if (params.uuid) {
       myResult = await this.tableModel.find({uuid: params.uuid});
    } else if (params.s_table_id) {
      myResult = await this.tableModel.find({s_table_id: params.s_table_id});
    } else if (params.a_table_id) {
      myResult = await this.tableModel.find({a_table_id: params.a_table_id});
    }

    return myResult;
  }

  async test(params: TadTableRelation) {
    let myResult = [];

    if (params.relation_type === "TEST") {
      myResult = await this.tableModel.find({
        where: {
          s_table_id: params.s_table_id,
        }
      });
    }

    return myResult
  }

  async save(params: TadTableRelation) {
    return await this.tableModel.save(params);
  }

  async update(params: TadTableRelation) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.relation_type = params.relation_type;
    myObject.s_db_user_id = params.s_db_user_id;
    myObject.s_table_id = params.s_table_id;
    myObject.s_column_id = params.s_column_id;
    myObject.a_db_user_id = params.a_db_user_id;
    myObject.a_table_id = params.a_table_id;
    myObject.a_column_id = params.a_column_id;
    myObject.data_flow = params.data_flow;
    myObject.relation_desc = params.relation_desc;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableRelation) {
    let myResult;

    if (params.uuid) {
      let myObject = await this.tableModel.findOne({uuid: params.uuid});
      myResult = await this.tableModel.remove(myObject);
    }

    return myResult;
  }
}
