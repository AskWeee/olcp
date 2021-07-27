import {Inject, Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadTable} from "../../entity/core/TadTable";
import {TadTableColumnService} from "./TadTableColumn";
import {TadTableIndexService} from "./TadTableIndex";
import {TadTablePartitionService} from "./TadTablePartition";
import {TadTableRelationService} from "./TadTableRelation";
import {TadTableIndexColumnService} from "./TadTableIndexColumn";
import {TadTableColumn} from "../../entity/core/TadTableColumn";
import {TadTableIndex} from "../../entity/core/TadTableIndex";
import {TadTableIndexColumn} from "../../entity/core/TadTableIndexColumn";
import {TadTablePartition} from "../../entity/core/TadTablePartition";

@Provide()
export class TadTableService {
  @InjectEntityModel(TadTable)
  tableModel: Repository<TadTable>;

  @Inject()
  coreTadTableColumn: TadTableColumnService;

  @Inject()
  coreTadTableIndex: TadTableIndexService;

  @Inject()
  coreTadTablePartition: TadTablePartitionService;

  @Inject()
  coreTadTableRelation: TadTableRelationService;

  @Inject()
  coreTadTableIndexColumn: TadTableIndexColumnService;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadTable) {
    return await this.tableModel.findOne({table_id: params.table_id});
  }

  async save(params: TadTable) {
    return await this.tableModel.save(params);
  }

  async update(params: TadTable) {
    let myObject = await this.tableModel.findOne(params.table_id);

    if (params.table_name !== null) myObject.table_name = params.table_name;
    if (params.table_desc !== null) myObject.table_desc = params.table_desc;
    if (params.table_type_id !== null) myObject.table_type_id = params.table_type_id;
    if (params.table_label_id !== null) myObject.table_label_id = params.table_label_id;
    if (params.db_user_id !== null) myObject.db_user_id = params.db_user_id;
    if (params.module_id !== null) myObject.module_id = params.module_id;
    if (params.create_user_id !== null) myObject.create_user_id = params.create_user_id;
    if (params.create_time !== null) myObject.create_time = params.create_time;
    if (params.modify_user_id !== null) myObject.modify_user_id = params.modify_user_id;
    if (params.modify_time !== null) myObject.modify_time = params.modify_time;
    if (params.partition_type !== null) myObject.partition_type = params.partition_type;
    if (params.partition_column !== null) myObject.partition_column = params.partition_column;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTable) {
    let myObject = await this.tableModel.find({table_id: params.table_id});

    //   myResult = await this.tableModel.createQueryBuilder()
    //     .delete()
    //     .from(TadTableColumn)
    //     .where("table_id = :tid", {tid: id})
    //     .execute();
    // }

    let myColumn = new TadTableColumn()
    myColumn.table_id = params.table_id;
    await this.coreTadTableColumn.delete(myColumn);

    let myIndex = new TadTableIndex()
    myIndex.table_id = params.table_id;
    await this.coreTadTableIndex.delete(myIndex);

    let myIndexColumn = new TadTableIndexColumn()
    myIndexColumn.table_id = params.table_id;
    await this.coreTadTableIndexColumn.delete(myIndexColumn);

    let myPartition = new TadTablePartition()
    myPartition.table_id = params.table_id;
    await this.coreTadTablePartition.delete(myPartition);

    return await this.tableModel.remove(myObject);
  }
}
