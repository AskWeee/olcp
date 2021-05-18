import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {TadDbConnectionInfo} from '../../entity/TadDbConnectionInfo';
import {Repository} from 'typeorm';

@Provide()
export class TadDbConnectionInfoService {
  @InjectEntityModel(TadDbConnectionInfo)
  tadDbConnectionInfoModel: Repository<TadDbConnectionInfo>;

  async findAll() {
    let myResult = await this.tadDbConnectionInfoModel.find();

    console.log("result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tadDbConnectionInfoModel.findOne({connection_id: id});

    console.log("result = ", myResult);
    return myResult;
  }

  async save(connection: TadDbConnectionInfo) {

    const myResult = await this.tadDbConnectionInfoModel.save(connection);

    console.log('result ', myResult);
    return myResult;
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

    const myResult = await this.tadDbConnectionInfoModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myObject = await this.tadDbConnectionInfoModel.findOne(id);

    const myResult = await this.tadDbConnectionInfoModel.remove(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async getSchemas(connInfo: TadDbConnectionInfo) {
    let myResult;

    if (connInfo.db_type == "mysql") {
      let myDb = require("mysql");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    } else {
      let myDb = require("oracledb");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    }

    return myResult;
  }

  async test(connInfo: TadDbConnectionInfo) {
    let myResult;

    const mysql = require('mysql')
    const pool = mysql.createPool({
      host: connInfo.db_host,
      port: connInfo.db_port,
      user: 'connInfo.db_username',
      password: connInfo.db_password,
      database: connInfo.db_sid
    });

    let myTest = function() {
      return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
          if (err) {
            console.log(err);
            let message = {success: false, message: {errno: err.errno, code: err.code}}
            resolve( message )
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
}
