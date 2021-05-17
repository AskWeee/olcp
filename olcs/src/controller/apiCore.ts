import {Inject, Controller, Post, Provide, Query, ALL} from '@midwayjs/decorator';
import {Context} from 'egg';
import {TadDbConnectionInfoService} from "../service/core/TadDbConnectionInfo";
import {OlcBatisService} from "../service/core/OlcBatis";
import {TadProductLineInfoService} from "../service/core/TadProductLineInfo";
import {TadProductInfoService} from "../service/core/TadProductInfo";
import {TadModuleInfoService} from "../service/core/TadModuleInfo";
import {TadProductRelService} from "../service/core/TadProductRel";
import {TadProductManagerInfoService} from "../service/core/TadProductManagerInfo";
import {TadProductVersionInfoService} from "../service/core/TadProductVersionInfo";
import {TadDbUserService} from "../service/core/TadDbUser";
import {TadTableService} from "../service/core/TadTable";
import {TadTableColumnService} from "../service/core/TadTableColumn";
import {TadDictService} from "../service/core/TadDict";
import {TadDbConnectionInfo} from "../entity/TadDbConnectionInfo";

@Provide()
@Controller('/api/core')
export class APICoreController {
  @Inject()
  ctx: Context;

  @Inject()
  coreTadDbConnectionInfoService: TadDbConnectionInfoService;

  @Inject()
  coreOlcBatisService: OlcBatisService;

  @Inject()
  coreTadProductLineInfoService: TadProductLineInfoService;

  @Inject()
  coreTadProductInfoService: TadProductInfoService;

  @Inject()
  coreTadModuleInfoService: TadModuleInfoService;

  @Inject()
  coreTadProductRelService: TadProductRelService;

  @Inject()
  coreTadProductManagerInfoService: TadProductManagerInfoService;

  @Inject()
  coreTadProductVersionInfoService: TadProductVersionInfoService;

  @Inject()
  coreTadDbUserService: TadDbUserService;

  @Inject()
  coreTadTable: TadTableService;

  @Inject()
  coreTadTableColumn: TadTableColumnService;

  @Inject()
  coreTadDict: TadDictService;

  @Post('/get_types')
  async getTypes(): Promise<any> {
    const data = await this.coreTadDict.findAll();

    return {success: true, message: "success", data: data};
  }

  @Post('/get_db_connections')
  async getDbConnections(): Promise<any> {
    const data = await this.coreTadDbConnectionInfoService.findAll();

    return {success: true, message: "success", data: data};
  }

  @Post('/get_db_connection')
  async getDbConnection(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadDbConnectionInfoService.find(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_db_connection')
  async addDbConnection(
    @Query() connection_name: string,
    @Query() db_type: string,
    @Query() db_host: string,
    @Query() db_port: string,
    @Query() db_sid: string,
    @Query() db_username: string,
    @Query() db_password: string): Promise<any> {

    const myResult = await this.coreTadDbConnectionInfoService.save(
      connection_name,
      db_type,
      db_host,
      db_port,
      db_sid,
      db_username,
      db_password);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_db_connection')
  async updateDbConnection(
    @Query() connection_id: number,
    @Query() connection_name: string,
    @Query() db_type: string,
    @Query() db_host: string,
    @Query() db_port: string,
    @Query() db_sid: string,
    @Query() db_username: string,
    @Query() db_password: string): Promise<any> {

    const myResult = await this.coreTadDbConnectionInfoService.update(
      connection_id,
      connection_name,
      db_type,
      db_host,
      db_port,
      db_sid,
      db_username,
      db_password);
    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_db_connection')
  async deleteDbConnection(
    @Query() connection_id: number): Promise<any> {

    const myResult = await this.coreTadDbConnectionInfoService.delete(connection_id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/test_db_connection')
  async testDbConnection(@Query(ALL) connInfo: TadDbConnectionInfo): Promise<any> {

    //const connInfo: TadDbConnectionInfo = ctx.request.body;

    const myResult = await this.coreTadDbConnectionInfoService.test(connInfo);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/get_products')
  async getProducts(): Promise<any> {
    const myResult = await this.coreOlcBatisService.getProducts();
    console.log(myResult);

    return {success: true, message: "success", data: myResult};
    // let myResult;
    // let mysql = require("mysql");
    // let connection = mysql.createConnection({
    //   host     : '10.12.2.104',
    //   user     : 'root',
    //   password : 'root123',
    //   database : 'olcdb'
    // });
    // connection.connect();
    //
    // let strSql = "select" +
    //   " tpli.product_line_id," +
    //   " tpli.product_line_name," +
    //   " tpli.product_line_desc," +
    //   " tpli.user_id," +
    //   " tpli.user_name," +
    //   " tpi.product_id," +
    //   " tpi.product_name," +
    //   " tpi.version_name," +
    //   " tpi.module_id," +
    //   " tpi.module_name," +
    //   " tpi.module_leader," +
    //   " tpi.module_desc," +
    //   " tpmi.product_manager_name" +
    //   " from " +
    //   " tad_product_rel tpr " +
    //   " left join (" +
    //   " select " +
    //   " _tpli.product_line_id," +
    //   " _tpli.product_line_name," +
    //   " _tpli.product_line_desc," +
    //   " tdu.user_id," +
    //   " tdu.user_name" +
    //   " from " +
    //   " tad_product_line_info _tpli " +
    //   " left join tad_db_user tdu on _tpli.product_line_id = tdu.product_line_id" +
    //   " ) tpli on tpr.product_line_id = tpli.product_line_id" +
    //   " left join (" +
    //   " select " +
    //   " _tpi.product_id," +
    //   " _tpi.product_name," +
    //   " tmi.module_id," +
    //   " tmi.module_name," +
    //   " tmi.module_leader, " +
    //   " tmi.module_desc," +
    //   " tpvi.version_name" +
    //   " from " +
    //   " tad_product_info _tpi" +
    //   " left join tad_module_info tmi on _tpi.product_id = tmi.product_id" +
    //   " left join tad_product_version_info tpvi on _tpi.product_id = tpvi.product_id" +
    //   " ) tpi on tpr.product_id = tpi.product_id" +
    //   " left join tad_product_manager_info tpmi on tpr.product_manager_id = tpmi.product_manager_id";
    //
    // //return new Promise((resolve, reject) => {
    // connection.query(strSql, function (error, results, fields) {
    //   if (error) return error;
    //
    //   myResult = results[0];
    //   console.log('result = ', myResult);
    //   connection.end();
    //   //return resolve()
    //   //return myResult;
    //   this.ctx.response.write("hello world");
    //   //});
    //
    //
    //   // db.query('SELECT 1', (err) => {
    //   //   if (err) {
    //   //     return reject(err)
    //   //   }
    //   //   return resolve()
    //   // })
    // })
    //
    //
    // //return myResult;
  }

  @Post('/add_product_line')
  async addProductLine(@Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.save(name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_product_line')
  async updateProductLine(@Query() id: number, @Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.update(id, name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_product_line')
  async deleteProductLine(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_product')
  async addProduct(@Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductInfoService.save(name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_product')
  async updateProduct(@Query() id: number, @Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductInfoService.update(id, name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_product')
  async deleteProduct(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadProductInfoService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_module')
  async addModule(@Query() name: string, @Query() desc: string, @Query() leader: string): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.save(name, desc, leader);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_module')
  async updateModule(@Query() id: number, @Query() name: string, @Query() desc: string, @Query() leader: string): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.update(id, name, desc, leader);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_module')
  async deleteModule(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_product_rel')
  async addProductRel(@Query() product_line_id: number, @Query() product_id: number, @Query() product_manager_id: number): Promise<any> {
    const myResult = await this.coreTadProductRelService.save(product_line_id, product_id, product_manager_id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_product_rel')
  async updateProductRel(@Query() id: number, @Query() product_line_id: number, @Query() product_id: number, @Query() product_manager_id: number): Promise<any> {
    const myResult = await this.coreTadProductRelService.update(id, product_line_id, product_id, product_manager_id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_product_rel')
  async deleteProductRel(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadProductRelService.delete(id);
    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_product_manager')
  async addProductManager(@Query() name: string, @Query() desc: string, @Query() email_addr: string, @Query() work_addr: string): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.save(name, desc, email_addr, work_addr);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_product_manager')
  async updateProductManager(@Query() id: number, @Query() name: string, @Query() desc: string, @Query() email_addr: string, @Query() work_addr: string): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.update(id, name, desc, email_addr, work_addr);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_product_manager')
  async deleteProductManager(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_product_version')
  async addProductVersion(@Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.save(name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_product_version')
  async updateProductVersion(@Query() id: number, @Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.update(id, name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_product_version')
  async deleteProductVersion(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_db_user')
  async addDbUser(@Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadDbUserService.save(name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_db_user')
  async updateDbUser(@Query() id: number, @Query() name: string, @Query() desc: string): Promise<any> {
    const myResult = await this.coreTadDbUserService.update(id, name, desc);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_db_user')
  async deleteDbUser(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadDbUserService.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_table')
  async addTable(
    @Query() name: string,
    @Query() desc: string,
    @Query() table_type_id: number,
    @Query() table_label_id: number,
    @Query() db_user_id: number,
    @Query() module_id: number,
    @Query() create_user_id: number,
    @Query() create_time: string,
    @Query() modify_user_id: number,
    @Query() modify_time: string): Promise<any> {
    const myResult = await this.coreTadTable.save(
      name,
      desc,
      table_type_id,
      table_label_id,
      db_user_id,
      module_id,
      create_user_id,
      create_time,
      modify_user_id,
      modify_time);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_table')
  async updateTable(
    @Query() id: number,
    @Query() name: string,
    @Query() desc: string,
    @Query() table_type_id: number,
    @Query() table_label_id: number,
    @Query() db_user_id: number,
    @Query() module_id: number,
    @Query() create_user_id: number,
    @Query() create_time: string,
    @Query() modify_user_id: number,
    @Query() modify_time: string): Promise<any> {
    const myResult = await this.coreTadTable.update(
      id,
      name,
      desc,
      table_type_id,
      table_label_id,
      db_user_id,
      module_id,
      create_user_id,
      create_time,
      modify_user_id,
      modify_time);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_table')
  async deleteTable(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadTable.delete(id);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/add_table_column')
  async addTableColumn(
    @Query() table_id: number,
    @Query() name: string,
    @Query() desc: string,
    @Query() column_type_id: number,
    @Query() data_length: number,
    @Query() default_value: string,
    @Query() is_null: string,
    @Query() primary_flag: string,
    @Query() split_flag: string,
    @Query() repeat_flag: string): Promise<any> {
    const myResult = await this.coreTadTableColumn.save(
      table_id,
      name,
      desc,
      column_type_id,
      data_length,
      default_value,
      is_null,
      primary_flag,
      split_flag,
      repeat_flag);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/update_table_column')
  async updateTableColumn(
    @Query() id: number,
    @Query() table_id: number,
    @Query() name: string,
    @Query() desc: string,
    @Query() column_type_id: number,
    @Query() data_length: number,
    @Query() default_value: string,
    @Query() is_null: string,
    @Query() primary_flag: string,
    @Query() split_flag: string,
    @Query() repeat_flag: string): Promise<any> {
    const myResult = await this.coreTadTableColumn.update(
      id,
      table_id,
      name,
      desc,
      column_type_id,
      data_length,
      default_value,
      is_null,
      primary_flag,
      split_flag,
      repeat_flag);

    return {success: true, message: "success", data: myResult};
  }

  @Post('/delete_table_column')
  async deleteTableColumn(
    @Query() id: number): Promise<any> {
    const myResult = await this.coreTadTableColumn.delete(id);

    return {success: true, message: "success", data: myResult};
  }
}
