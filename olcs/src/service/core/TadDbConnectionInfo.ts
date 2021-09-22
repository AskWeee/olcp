import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {TadDbConnectionInfo} from '../../entity/core/TadDbConnectionInfo';
import {Repository} from 'typeorm';
import {RestResult} from "../../controller/RestResult";

@Provide()
export class TadDbConnectionInfoService {
  @InjectEntityModel(TadDbConnectionInfo)
  tadDbConnectionInfoModel: Repository<TadDbConnectionInfo>;

  async findAll() {
    return await this.tadDbConnectionInfoModel.find();
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    return await this.tadDbConnectionInfoModel.findOne({connection_id: id});
  }

  async save(connection: TadDbConnectionInfo) {
    return await this.tadDbConnectionInfoModel.save(connection);
  }

  async update(connection: TadDbConnectionInfo) {

    let myObject = await this.tadDbConnectionInfoModel.findOne(connection.connection_id);

    myObject.connection_name = connection.connection_name;
    myObject.db_type = connection.db_type;
    myObject.db_host = connection.db_host;
    myObject.db_port = connection.db_port;
    myObject.db_sid = connection.db_sid;
    myObject.db_username = connection.db_username;
    myObject.db_password = connection.db_password;

    return await this.tadDbConnectionInfoModel.save(myObject);
  }

  async delete(id: number) {
    let myObject = await this.tadDbConnectionInfoModel.findOne(id);

    return await this.tadDbConnectionInfoModel.remove(myObject);
  }

  async getSchemas(connInfo: TadDbConnectionInfo) {
    let myResultTables;
    let myResultIndexes;
    let myResultPartitions;
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

    let myGetSchemas = function () {
      let getResult = new RestResult();

      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            console.log(err);
            getResult.code = err.code;
            getResult.success = false;
            getResult.message = err.errno;
            resolve(getResult)
          } else {
            if (myDbType === 'mysql') {
              let strSql = "select" +
                " t.TABLE_NAME as table_name," +
                " tc.COLUMN_NAME as column_name," +
                " tc.DATA_TYPE as data_type," +
                " tc.CHARACTER_MAXIMUM_LENGTH as data_length" +
                " from information_schema.TABLES t" +
                " left join information_schema.COLUMNS tc on t.TABLE_NAME = tc.TABLE_NAME" +
                " where t.TABLE_SCHEMA = 'olcdb'" +
                " and tc.TABLE_SCHEMA = 'olcdb'" +
                " order by t.TABLE_SCHEMA, tc.COLUMN_NAME";
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                let metaData = [{name: "TABLE_NAME"}, {name: "COLUMN_NAME"}, {name: "DATA_TYPE"}, {name: "DATA_LENGTH"}];
                let rows = [];
                for (let i = 0; i < results.length; i++) {
                  let row = [];
                  row.push(results[i].table_name);
                  row.push(results[i].column_name);
                  row.push(results[i].data_type);
                  row.push(results[i].data_length);
                  rows.push(row);
                }
                getResult.data = {metaData: metaData, rows: rows};
                resolve(getResult);
                connection.release();
              });

            } else if (myDbType === 'oracle') {
              let strSql = "select" +
                " t.TABLE_NAME as table_name," +
                " tc.COLUMN_NAME as column_name," +
                " tc.DATA_TYPE as data_type," +
                " tc.DATA_LENGTH as data_length" +
                " from USER_TABLES t" +
                " left join USER_TAB_COLUMNS tc on t.TABLE_NAME = tc.TABLE_NAME" +
                " order by t.table_name, tc.column_name";

              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                getResult.data = results;
                resolve(getResult);
                connection.release();
              });
            }
          }
        });
      });
    }

    let myGetIndexes = function () {
      let getResult = new RestResult();

      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            console.log(err);
            getResult.code = err.code;
            getResult.success = false;
            getResult.message = err.errno;
            resolve(getResult)
          } else {
            if (myDbType === 'mysql') {
              let strSql = "select" +
                " t.TABLE_NAME as table_name," +
                " tc.COLUMN_NAME as column_name," +
                " tc.DATA_TYPE as data_type," +
                " tc.CHARACTER_MAXIMUM_LENGTH as data_length" +
                " from information_schema.TABLES t" +
                " left join information_schema.COLUMNS tc on t.TABLE_NAME = tc.TABLE_NAME" +
                " where t.TABLE_SCHEMA = 'olcdb'" +
                " and tc.TABLE_SCHEMA = 'olcdb'" +
                " order by t.TABLE_SCHEMA, tc.COLUMN_NAME";
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                let metaData = [{name: "TABLE_NAME"}, {name: "COLUMN_NAME"}, {name: "DATA_TYPE"}, {name: "DATA_LENGTH"}];
                let rows = [];
                for (let i = 0; i < results.length; i++) {
                  let row = [];
                  row.push(results[i].table_name);
                  row.push(results[i].column_name);
                  row.push(results[i].data_type);
                  row.push(results[i].data_length);
                  rows.push(row);
                }
                getResult.data = {metaData: metaData, rows: rows};
                resolve(getResult);
                connection.release();
              });

            } else if (myDbType === 'oracle') {
              let strSql = "select" +
                " i.TABLE_NAME as table_name," +
                " i.INDEX_NAME as index_name," +
                " i.INDEX_TYPE as index_type," +
                " i.UNIQUENESS as uniqueness," +
                " ic.COLUMN_NAME as column_name," +
                " ic.COLUMN_POSITION as column_position," +
                " ic.DESCEND as descend" +
                " from USER_INDEXES i" +
                " left join USER_IND_COLUMNS ic on i.TABLE_NAME = ic.TABLE_NAME and i.INDEX_NAME = ic.INDEX_NAME" +
                " order by i.TABLE_NAME, i.INDEX_NAME, ic.COLUMN_POSITION";

              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                getResult.data = results;
                resolve(getResult);
                connection.release();
              });
            }
          }
        });
      });
    }

    let myGetPartitions = function () {
      let getResult = new RestResult();

      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            console.log(err);
            getResult.code = err.code;
            getResult.success = false;
            getResult.message = err.errno;
            resolve(getResult)
          } else {
            if (myDbType === 'mysql') {
              let strSql = "select" +
                " t.TABLE_NAME as table_name," +
                " tc.COLUMN_NAME as column_name," +
                " tc.DATA_TYPE as data_type," +
                " tc.CHARACTER_MAXIMUM_LENGTH as data_length" +
                " from information_schema.TABLES t" +
                " left join information_schema.COLUMNS tc on t.TABLE_NAME = tc.TABLE_NAME" +
                " where t.TABLE_SCHEMA = 'olcdb'" +
                " and tc.TABLE_SCHEMA = 'olcdb'" +
                " order by t.TABLE_SCHEMA, tc.COLUMN_NAME";
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                let metaData = [{name: "TABLE_NAME"}, {name: "COLUMN_NAME"}, {name: "DATA_TYPE"}, {name: "DATA_LENGTH"}];
                let rows = [];
                for (let i = 0; i < results.length; i++) {
                  let row = [];
                  row.push(results[i].table_name);
                  row.push(results[i].column_name);
                  row.push(results[i].data_type);
                  row.push(results[i].data_length);
                  rows.push(row);
                }
                getResult.data = {metaData: metaData, rows: rows};
                resolve(getResult);
                connection.release();
              });

            } else if (myDbType === 'oracle') {
              let strSql = "select" +
                " pt.TABLE_NAME as table_name," +
                " pt.PARTITIONING_TYPE as partition_type," +
                " tp.PARTITION_NAME as partition_name," +
                " tp.HIGH_VALUE as high_value," +
                " tp.PARTITION_POSITION as partition_position," +
                " pc.COLUMN_NAME as column_name" +
                " from USER_PART_TABLES pt" +
                " left join ALL_TAB_PARTITIONS tp on pt.TABLE_NAME = tp.TABLE_NAME" +
                " left join ALL_PART_KEY_COLUMNS pc on pt.TABLE_NAME = pc.NAME and pc.OBJECT_TYPE = 'TABLE'";
              // " where pt.PARTITIONING_KEY_COUNT = 1";

              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                getResult.data = results;
                resolve(getResult);
                connection.release();
              });
            }
          }
        });
      });
    }

    myResultTables = await myGetSchemas();
    myResultIndexes = await myGetIndexes();
    myResultPartitions = await myGetPartitions();

    let myResult = new RestResult();
    myResult.data.push(myResultTables);
    myResult.data.push(myResultIndexes);
    myResult.data.push(myResultPartitions)

    return myResult;
  }

  async getIndexes() {
    /*

     */
  }

  async getPartitions() {
    /*
select
table_name,
partition_name,
high_value,
partition_position,
num_rows
from dba_tab_partitions;

select *
from ALL_TAB_SUBPARTITIONS;

select *
from ALL_PART_TABLES;
     */
  }

  async getKpis(connInfo: TadDbConnectionInfo) {

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

    let myGetSchemas = function () {
      let getResult = new RestResult();

      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            console.log(err);
            getResult.code = err.code;
            getResult.success = false;
            getResult.message = err.errno;
            resolve(getResult)
          } else {
            let strSql = "select" +
              " ks.SCHEMA_ID as schema_id," +
              " ks.SCHEMA_NS as schema_ns," +
              " ks.SCHEMA_ZHNAME as schema_zhname," +
              " ks.SCHEMA_ENNAME as schema_enname," +
              " ks.COUNTER_TAB_NAME as counter_tab_name," +
              " ks.TAB_NAME as tab_name," +
              " ks.VENDOR_ID as vendor_id," +
              " ks.OBJECT_CLASS as object_class," +
              " ks.SUB_CLASS as sub_class," +
              " ks.INTERVAL_FLAG as interval_flag," +
              " k.KPI_ID as kpi_id," +
              " k.KPI_ZHNAME as kpi_zhname," +
              " k.KPI_ENNAME as kpi_enname," +
              " k.KPI_FIELD as kpi_field," +
              " k.KPI_EXP as kpi_exp," +
              " k.KPI_ALARM as kpi_alarm," +
              " k.KPI_FORMAT as kpi_format," +
              " k.KPI_MIN_VALUE as kpi_min_value," +
              " k.KPI_MAX_VALUE as kpi_max_value" +
              " from TAI_RTKPISCHEMA ks" +
              " left join TAI_RTKPIS k on ks.SCHEMA_ID = k.SCHEMA_ID" +
              " order by ks.schema_zhname, k.kpi_id";

            if (myDbType === 'mysql') {
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                let metaData = [{name: "TABLE_NAME"}, {name: "COLUMN_NAME"}, {name: "DATA_TYPE"}, {name: "DATA_LENGTH"}];
                let rows = [];
                for (let i = 0; i < results.length; i++) {
                  let row = [];
                  row.push(results[i].table_name);
                  row.push(results[i].column_name);
                  row.push(results[i].data_type);
                  row.push(results[i].data_length);
                  rows.push(row);
                }
                getResult.data = {metaData: metaData, rows: rows};
                resolve(getResult);
                connection.release();
              });

            } else if (myDbType === 'oracle') {
              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                getResult.data = results;
                resolve(getResult);
                connection.release();
              });
            }
          }
        });
      });
    }

    myResultTables = await myGetSchemas();

    let myResult = new RestResult();
    myResult.data.push(myResultTables);

    return myResult;

  }

  async test(connInfo: TadDbConnectionInfo) {
    let myResult;
    let myDb;
    let myPool;

    if (connInfo.db_type == "mysql") {
      myDb = require("mysql");
    } else {
      myDb = require("oracledb");
    }

    myPool = await myDb.createPool({
      host: connInfo.db_host,
      port: connInfo.db_port,
      user: connInfo.db_username,
      password: connInfo.db_password,
      database: connInfo.db_sid
    });

    let myTest = function () {
      return new Promise((resolve, reject) => {
        myPool.getConnection(function (err, connection) {
          if (err) {
            let message = {success: false, message: {errno: err.errno, code: err.code}}
            resolve(message)
          } else {
            let message = {success: true, message: 'success'}
            resolve(message);
            connection.release();
          }
        });
      });
    }

    myResult = await myTest();

    return myResult;
  }

  async getTableRecords(connInfo: TadDbConnectionInfo) {
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
            resolve(getResult)
          } else {
            let strSql = "select * from " + connInfo.tag.tableName;

            if (myDbType === 'mysql') {
              connection.query(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
                  resolve(getResult);
                }
                getResult.data.push(results);
                let strSqlMeta = "select table_schema, column_name, data_type" +
                  " from information_schema.COLUMNS" +
                  " where table_name = '" + connInfo.tag.tableName + "'";
                connection.query(strSqlMeta, function (errQuery, resultsMeta) {
                  if (!errQuery) {
                    getResult.data.push(resultsMeta);
                  }
                  resolve(getResult);
                  connection.release();
                });
              });
            } else if (myDbType === 'oracle') {

              connection.execute(strSql, function (errQuery, results) {
                if (errQuery) {
                  getResult.code = errQuery.code;
                  getResult.success = false;
                  getResult.message = errQuery.errno;
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
                let strSqlMeta = "select '" + connInfo.db_sid + "' table_schema, column_name, data_type" +
                  " from USER_TAB_COLUMNS" +
                  " where table_name = '" + connInfo.tag.tableName.toUpperCase() + "'";
                connection.execute(strSqlMeta, function (errQuery, resultsMeta) {
                  if (!errQuery) {
                    let rowsMetaNew = [];
                    let n = 0;
                    resultsMeta.rows.forEach((itemRecordMeta: any) => {
                      rowsMetaNew[n] = {};
                      for (let i = 0; i < itemRecordMeta.length; i++) {
                        rowsMetaNew[n][resultsMeta.metaData[i].name.toLowerCase()] = itemRecordMeta[i].toLowerCase();
                      }
                      n++;
                    })
                    getResult.data.push(rowsMetaNew);
                  } else {
                    console.log(errQuery);
                  }
                  resolve(getResult);
                  connection.release();
                });
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
