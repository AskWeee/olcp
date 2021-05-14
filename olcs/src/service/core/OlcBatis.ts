import {Provide} from "@midwayjs/decorator";

@Provide()
export class OlcBatisService {

  async getProducts() {
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
      " tpli.product_line_id," +
      " tpli.product_line_name," +
      " tpli.product_line_desc," +
      " tpli.user_id," +
      " tpli.user_name," +
      " tpi.product_id," +
      " tpi.product_name," +
      " tpi.version_name," +
      " tpi.module_id," +
      " tpi.module_name," +
      " tpi.module_leader," +
      " tpi.module_desc," +
      " tpmi.product_manager_name" +
      " from " +
      " tad_product_rel tpr " +
      " left join (" +
      " select " +
      " _tpli.product_line_id," +
      " _tpli.product_line_name," +
      " _tpli.product_line_desc," +
      " tdu.user_id," +
      " tdu.user_name" +
      " from " +
      " tad_product_line_info _tpli " +
      " left join tad_db_user tdu on _tpli.product_line_id = tdu.product_line_id" +
      " ) tpli on tpr.product_line_id = tpli.product_line_id" +
      " left join (" +
      " select " +
      " _tpi.product_id," +
      " _tpi.product_name," +
      " tmi.module_id," +
      " tmi.module_name," +
      " tmi.module_leader, " +
      " tmi.module_desc," +
      " tpvi.version_name" +
      " from " +
      " tad_product_info _tpi" +
      " left join tad_module_info tmi on _tpi.product_id = tmi.product_id" +
      " left join tad_product_version_info tpvi on _tpi.product_id = tpvi.product_id" +
      " ) tpi on tpr.product_id = tpi.product_id" +
      " left join tad_product_manager_info tpmi on tpr.product_manager_id = tpmi.product_manager_id";

    connection.query(strSql, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      myResult = results[0];
      connection.end();
    });

    console.log(strSql);

    return myResult;
  }

}
