import {Provide} from '@midwayjs/decorator';
import {TadDbConnectionInfo} from '../../entity/core/TadDbConnectionInfo';
import {RestResult} from "../../controller/RestResult";

@Provide()
export class AlarmsStatusAnalysisService {
  async getAlarms1407(connInfo: TadDbConnectionInfo) {
    let myResultTables;
    let myDb;
    let myPool;
    let myDbType = connInfo.db_type.toLowerCase();

    if (myDbType === "mysql") {
      myDb = require("mysql");
    } else if (myDbType === 'oracle') {
      myDb = require("oracledb");
    }

    myPool = await myDb.createPool({
      host: connInfo.db_host,
      port: connInfo.db_port,
      user: connInfo.db_username,
      password: connInfo.db_password,
      database: connInfo.db_sid,
      connectString: connInfo.db_host + ":" + connInfo.db_port + "/" + connInfo.db_sid
    });

    let myGetRecords = function () {
      let getResult = new RestResult();

      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            console.log(err);
            getResult.code = err.code;
            getResult.success = false;
            getResult.message = err.errno;
            // 失败，返回结果
            resolve(getResult)
          } else {
            let strSql = "select * from inspect_1407_active_info_znjk order by event_time";

            if (myDbType === 'mysql') {
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  // 失败，返回结果
                  resolve(getResult);
                }
                console.log(results.length);
                let mapAlarms = new Map();
                results.forEach((row:any) => {
                  let fp = row.fp0 + "_" + row.fp1 + "_" + row.fp2 + "_" + row.fp3;

                  if (!mapAlarms.has(fp)) {
                    // let mapValue = new Map();

                    mapAlarms.set(fp, [{event_time: row.event_time, service_name: row.service_name, topic_name: row.topic_name}])
                  } else {
                    mapAlarms.get(fp).push({event_time: row.event_time, service_name: row.service_name, topic_name: row.topic_name});
                  }
                });

                let rowsNew = [];
                mapAlarms.forEach((value, key) => {
                  if (value.length < 3) {
                    console.log(key, value);
                    rowsNew.push({fp: key, flow: value});
                  }
                });
                getResult.data.push(rowsNew);
                // 成功：返回结果
                resolve(getResult);
                connection.release();
              });
            } else if (myDbType === 'oracle') {
              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  // 失败，返回结果
                  resolve(getResult);
                }

                let rowsNew = [];
                let n = 0;
                results.rows.forEach((itemRecord: any) => {
                  rowsNew[n] = {};
                  for (let i = 0; i < itemRecord.length; i++) {
                    let columnName = results.metaData[i].name.toLowerCase();
                    rowsNew[n][columnName] = itemRecord[i]
                  }
                  n++;
                })
                getResult.data.push(rowsNew);
                // 成功：返回结果
                resolve(getResult);
                connection.release();
              });
            }
          }
        });
      });
    }
    myResultTables = await myGetRecords();

    return myResultTables;
  }

}
