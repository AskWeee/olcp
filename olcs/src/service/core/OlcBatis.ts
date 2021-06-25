import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import {Repository} from "typeorm";
import {TadProductRel} from "../../entity/core/TadProductRel";
import {TadProductLineInfo} from "../../entity/core/TadProductLineInfo";
import {TadProductInfo} from "../../entity/core/TadProductInfo";
import {TadProductManagerInfo} from "../../entity/core/TadProductManagerInfo";
import {TadModuleInfo} from "../../entity/core/TadModuleInfo";
import {TadDbUser} from "../../entity/core/TadDbUser";
import {TadTable} from "../../entity/core/TadTable";
import {TadTableColumn} from "../../entity/core/TadTableColumn";

@Provide()
export class OlcBatisService {

  @InjectEntityModel(TadProductRel)
  tadProductRelModel: Repository<TadProductRel>;

  @InjectEntityModel(TadProductLineInfo)
  tadProductLineInfo: Repository<TadProductLineInfo>;

  @InjectEntityModel(TadProductInfo)
  tadProductInfo: Repository<TadProductLineInfo>;

  @InjectEntityModel(TadModuleInfo)
  tadModuleInfo: Repository<TadModuleInfo>;

  @InjectEntityModel(TadDbUser)
  tadDbUserModel: Repository<TadDbUser>;

  @InjectEntityModel(TadTable)
  tadTableModel: Repository<TadTable>;

  async getProducts() {
    let subQueryProduct = this.tadProductInfo.createQueryBuilder("tpi")
      .leftJoinAndSelect(TadModuleInfo, "tmi", "tpi.product_id = tmi.product_id")
      .select("tpi.product_id as product_id" +
        ", tpi.product_name as product_name" +
        ", tpi.product_desc as product_desc" +
        ", tmi.module_id as module_id" +
        ", tmi.module_name as module_name" +
        ", tmi.module_desc as module_desc" +
        ", tmi.module_leader as module_leader");

    let myResult =  this.tadProductRelModel.createQueryBuilder("tpr")
      .leftJoinAndSelect(TadProductLineInfo, "tpli", "tpr.product_line_id = tpli.product_line_id")
      .leftJoinAndSelect("(" + subQueryProduct.getQuery() + ")", "tpi", "tpr.product_id = tpi.product_id")
      .leftJoinAndSelect(TadProductManagerInfo, "tpmi", "tpr.product_manager_id = tpmi.product_manager_id")
      .select("tpr.product_rel_id as product_rel_id" +
        ", tpr.product_line_id as product_line_id" +
        ", tpli.product_line_name as product_line_name" +
        ", tpli.product_line_desc as product_line_desc" +
        ", tpr.product_id as product_id" +
        ", tpi.product_name as product_name" +
        ", tpi.product_desc as product_desc" +
        ", tpi.module_id as module_id" +
        ", tpi.module_name as module_name" +
        ", tpi.module_desc as module_desc" +
        ", tpi.module_leader as module_leader" +
        ", tpr.product_manager_id as product_manager_id" +
        ", tpmi.product_manager_name as product_manager_name" +
        ", tpmi.tel_no as tel_no" +
        ", tpmi.email_addr as email_addr" +
        ", tpmi.work_addr as work_addr")
      .getRawMany();

    console.log('getProducts result = ', myResult);
    return myResult;
  }

  async getTables() {
    let myResult =  this.tadTableModel.createQueryBuilder("tt")
      .leftJoinAndSelect(TadTableColumn, "ttc", "tt.table_id = ttc.table_id")
      .select("tt.table_id as table_id," +
        " tt.table_name as table_name," +
        " tt.table_desc as table_desc," +
        " tt.table_type_id as table_type_id," +
        " tt.table_label_id as table_label_id," +
        " tt.db_user_id as db_user_id," +
        " tt.module_id as module_id," +
        " ttc.column_id as column_id," +
        " ttc.column_name as column_name," +
        " ttc.column_desc as column_desc," +
        " ttc.column_type_id as column_type_id," +
        " ttc.data_length as data_length," +
        " ttc.default_value as default_value," +
        " ttc.is_null as is_null," +
        " ttc.primary_flag as primary_flag," +
        " ttc.split_flag as split_flag," +
        " ttc.repeat_flag as repeat_flag")
      .getRawMany()

    console.log('getTables result = ', myResult);
    return myResult;
  }
}
