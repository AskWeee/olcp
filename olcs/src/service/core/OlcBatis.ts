import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import {Repository} from "typeorm";
import {TadProductRel} from "../../entity/TadProductRel";
import {TadProductLineInfo} from "../../entity/TadProductLineInfo";
import {TadProductInfo} from "../../entity/TadProductInfo";
import {TadProductManagerInfo} from "../../entity/TadProductManagerInfo";

@Provide()
export class OlcBatisService {

  @InjectEntityModel(TadProductRel)
  tadProductRelModel: Repository<TadProductRel>;

  @InjectEntityModel(TadProductLineInfo)
  tadProductLineInfo: Repository<TadProductLineInfo>;

  async getProducts() {

    let myResult =  this.tadProductRelModel.createQueryBuilder("tpr")
      .leftJoinAndSelect(TadProductInfo, "tpi", "tpi.product_id = tpr.product_line_id")
      .leftJoinAndSelect(TadProductLineInfo, "tpli", "tpli.product_line_id = tpr.product_line_id")
      .leftJoinAndSelect(TadProductManagerInfo, "tpmi", "tpmi.product_manager_id = tpr.product_manager_id")
      .getMany();
    let sql = this.tadProductRelModel.createQueryBuilder("tpr")
      .select("*")
      .leftJoinAndSelect(TadProductInfo, "tpi", "tpr.product_id = tpi.product_line_id")
      .leftJoinAndSelect(TadProductLineInfo, "tpli", "tpr.product_line_id = tpli.product_line_id")
      .leftJoinAndSelect(TadProductManagerInfo, "tpmi", "tpr.product_manager_id = tpmi.product_manager_id")
      .getSql()

    //Connection.query("select * from tad_dict", function (error, results, fields) {});

    console.log('result = ', myResult, sql);
    return myResult;
  }

  // async getProductsa() {
  //   let myResult;
  //   let mysql = require("mysql");
  //   let connection = mysql.createConnection({
  //       host     : '10.12.2.104',
  //       user     : 'root',
  //       password : 'root123',
  //       database : 'olcdb'
  //   });
  //   connection.connect();
  //
  //   let strSql = "select" +
  //     " tpli.product_line_id," +
  //     " tpli.product_line_name," +
  //     " tpli.product_line_desc," +
  //     " tpli.user_id," +
  //     " tpli.user_name," +
  //     " tpi.product_id," +
  //     " tpi.product_name," +
  //     " tpi.version_name," +
  //     " tpi.module_id," +
  //     " tpi.module_name," +
  //     " tpi.module_leader," +
  //     " tpi.module_desc," +
  //     " tpmi.product_manager_name" +
  //     " from " +
  //     " tad_product_rel tpr " +
  //     " left join (" +
  //     " select " +
  //     " _tpli.product_line_id," +
  //     " _tpli.product_line_name," +
  //     " _tpli.product_line_desc," +
  //     " tdu.user_id," +
  //     " tdu.user_name" +
  //     " from " +
  //     " tad_product_line_info _tpli " +
  //     " left join tad_db_user tdu on _tpli.product_line_id = tdu.product_line_id" +
  //     " ) tpli on tpr.product_line_id = tpli.product_line_id" +
  //     " left join (" +
  //     " select " +
  //     " _tpi.product_id," +
  //     " _tpi.product_name," +
  //     " tmi.module_id," +
  //     " tmi.module_name," +
  //     " tmi.module_leader, " +
  //     " tmi.module_desc," +
  //     " tpvi.version_name" +
  //     " from " +
  //     " tad_product_info _tpi" +
  //     " left join tad_module_info tmi on _tpi.product_id = tmi.product_id" +
  //     " left join tad_product_version_info tpvi on _tpi.product_id = tpvi.product_id" +
  //     " ) tpi on tpr.product_id = tpi.product_id" +
  //     " left join tad_product_manager_info tpmi on tpr.product_manager_id = tpmi.product_manager_id";
  //
  //   //return new Promise((resolve, reject) => {
  //     let t = await connection.query(strSql, function (error, results, fields) {
  //       if (error) return error;
  //
  //       myResult = results[0];
  //       console.log('result = ', myResult);
  //       connection.end();
  //       //return resolve()
  //       return myResult;
  //     //});
  //
  //
  //     // db.query('SELECT 1', (err) => {
  //     //   if (err) {
  //     //     return reject(err)
  //     //   }
  //     //   return resolve()
  //     // })
  //   })
  //   return t;
  //
  //   //return myResult;
  // }

  async getTables() {
    let myResult;
    let mysql = require("mysql");
    let connection = mysql.createConnection({
      host     : '10.12.2.104',
      user     : 'root',
      password : 'root123',
      database : 'olcdb'
    });
    connection.connect();

    let strSql = "select" +
      " tt.table_id," +
      " tt.table_name," +
      " tt.table_desc," +
      " tt.table_type_id," +
      " tt.table_label_id," +
      " tt.db_user_id," +
      " tt.module_id," +
      " ttc.column_id," +
      " ttc.column_name," +
      " ttc.column_desc," +
      " ttc.column_type_id," +
      " ttc.data_length," +
      " ttc.default_value," +
      " ttc.is_null," +
      " ttc.primary_flag," +
      " ttc.split_flag," +
      " ttc.repeat_flag" +
      " from tad_table tt" +
      " left join tad_table_column ttc on tt.table_id = ttc.table_id";

    connection.query(strSql, function (error, results, fields) {
      if (error) throw error;
      console.log('results = ', results);
      myResult = results[0];
      connection.end();
    });


    return myResult;
  }
}
