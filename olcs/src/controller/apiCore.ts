import {ALL, Body, Controller, Inject, Post, Provide} from '@midwayjs/decorator';
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
import {TadDbConnectionInfo} from "../entity/core/TadDbConnectionInfo";
import {RestResult} from "./RestResult";
import {TadProductLineInfo} from "../entity/core/TadProductLineInfo";
import {TadProductInfo} from "../entity/core/TadProductInfo";
import {TadModuleInfo} from "../entity/core/TadModuleInfo";
import {TadProductRel} from "../entity/core/TadProductRel";
import {TadProductManagerInfo} from "../entity/core/TadProductManagerInfo";
import {TadProductVersionInfo} from "../entity/core/TadProductVersionInfo";
import {TadDbUser} from "../entity/core/TadDbUser";
import {TadTable} from "../entity/core/TadTable";
import {TadTableColumn} from "../entity/core/TadTableColumn";
import {TadTableIgnore} from "../entity/core/TadTableIgnore";
import {TadTableIgnoreService} from "../service/core/TadTableIgnore";
import {TadTableIndex} from "../entity/core/TadTableIndex";
import {TadTableIndexService} from "../service/core/TadTableIndex";
import {TadTablePartition} from "../entity/core/TadTablePartition";
import {TadTablePartitionService} from "../service/core/TadTablePartition";
import {TadTableRelation} from "../entity/core/TadTableRelation";
import {TadTableRelationService} from "../service/core/TadTableRelation";
import {TadTableIndexColumn} from "../entity/core/TadTableIndexColumn";
import {TadTableIndexColumnService} from "../service/core/TadTableIndexColumn";

@Provide()
@Controller('/api/core', { tagName: 'Core Group', description: '系统核心业务API'})
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

  @Inject()
  coreTadTableIgnore: TadTableIgnoreService;

  @Inject()
  coreTadTableIndex: TadTableIndexService;

  @Inject()
  coreTadTablePartition: TadTablePartitionService;

  @Inject()
  coreTadTableRelation: TadTableRelationService;

  @Inject()
  coreTadTableIndexColumn: TadTableIndexColumnService;

  @Post('/get_db_schemas')
  async getDbSchemas(@Body(ALL) connInfo: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const result = await this.coreTadDbConnectionInfoService.getSchemas(connInfo);
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  // @Post('/get_tables')
  // async getTables(): Promise<any> {
  //   let restResult = new RestResult();
  //
  //   const data = await this.coreOlcBatisService.getTables();
  //   restResult.data = data;
  //
  //   return restResult;
  // }

  @Post('/get_types')
  async getTypes(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDict.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/get_db_connections')
  async getDbConnections(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbConnectionInfoService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/get_db_connection')
  async getDbConnection(@Body(ALL) connection: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbConnectionInfoService.find(connection.connection_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/add_db_connection')
  async addDbConnection(@Body(ALL) connection: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbConnectionInfoService.save(connection);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_db_connection')
  async updateDbConnection(@Body(ALL) connection: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbConnectionInfoService.update(connection);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_db_connection')
  async deleteDbConnection(@Body(ALL) connection: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const myResult = await this.coreTadDbConnectionInfoService.delete(connection.connection_id);

    restResult.data = myResult;
    return restResult;
  }

  @Post('/test_db_connection')
  async testDbConnection(@Body(ALL) connInfo: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbConnectionInfoService.test(connInfo);
    restResult.data = data;

    return restResult;
  }

  // @Post('/get_products')
  // async getProducts(): Promise<any> {
  //   let restResult = new RestResult();
  //
  //   const myResult = await this.coreOlcBatisService.getProducts();
  //   restResult.data = myResult;
  //
  //   return restResult;
  // }

  @Post('/get_product_lines')
  async getProductLines(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product_line')
  async addProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.save(productLine);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_line')
  async updateProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.update(productLine);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_line')
  async deleteProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.delete(productLine);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_products')
  async getProducts(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.coreTadProductInfoService.findAll();

    return restResult;
  }

  @Post('/add_product')
  async addProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.save(product);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product')
  async updateProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.update(product);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product')
  async deleteProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.delete(product);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_modules')
  async getModules(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.coreTadModuleInfoService.findAll();

    return restResult;
  }

  @Post('/add_module')
  async addModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.save(module);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_module')
  async updateModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.update(module);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_module')
  async deleteModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.delete(module);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_product_relations')
  async getProductRelations(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product_relation')
  async addProductRelation(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.save(productRel);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_relation')
  async updateProductRelation(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.update(productRel);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_relation')
  async deleteProductRelation(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.delete(productRel);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_product_managers')
  async getProductManagers(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductManagerInfoService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product_manager')
  async addProductManager(@Body(ALL) manager: TadProductManagerInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductManagerInfoService.save(manager.product_manager_name, manager.tel_no, manager.email_addr, manager.work_addr);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_manager')
  async updateProductManager(@Body(ALL) manager: TadProductManagerInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductManagerInfoService.update(manager.product_manager_id, manager.product_manager_name, manager.tel_no, manager.email_addr, manager.work_addr);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_manager')
  async deleteProductManager(@Body(ALL) manger: TadProductManagerInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductManagerInfoService.delete(manger.product_manager_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_product_versions')
  async getProductVersions(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductVersionInfoService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product_version')
  async addProductVersion(@Body(ALL) version: TadProductVersionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductVersionInfoService.save(version.version_name, version.version_desc, version.product_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_version')
  async updateProductVersion(@Body(ALL) version: TadProductVersionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductVersionInfoService.update(version.version_id, version.version_name, version.version_desc, version.product_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_version')
  async deleteProductVersion(@Body(ALL) version: TadProductVersionInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductVersionInfoService.delete(version.version_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_db_users')
  async getDbUsers(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbUserService.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_db_user')
  async addDbUser(@Body(ALL) dbUser: TadDbUser): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbUserService.save(dbUser.user_name, dbUser.user_desc, dbUser.product_line_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_db_user')
  async updateDbUser(@Body(ALL) dbUser: TadDbUser): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbUserService.update(dbUser.user_id, dbUser.user_name, dbUser.user_desc, dbUser.product_line_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_db_user')
  async deleteDbUser(@Body(ALL) dbUser: TadDbUser): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadDbUserService.delete(dbUser.user_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_tables')
  async getTables(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTable.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_table')
  async addTable(@Body(ALL) table: TadTable): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTable.save(table);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_table')
  async updateTable(@Body(ALL) table: TadTable): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTable.update(table);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_table')
  async deleteTable(@Body(ALL) table: TadTable): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTable.delete(table);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_table_columns')
  async getTableColumns(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableColumn.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/get_table_column')
  async getTableColumn(@Body(ALL) params: TadTableColumn): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableColumn.find(params);

    return restResult;
  }

  @Post('/add_table_column')
  async addTableColumn(@Body(ALL) column: TadTableColumn): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableColumn.save(column);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_table_column')
  async updateTableColumn(@Body(ALL) column: TadTableColumn): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableColumn.update(column);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_table_column')
  async deleteTableColumn(@Body(ALL) column: TadTableColumn): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableColumn.delete(column);
    restResult.data = data;

    return restResult;
  }

  @Post('/get_table_ignores')
  async getTableIgnores(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableIgnore.findAll();
    restResult.data = data;

    return restResult;
  }

  @Post('/add_table_ignore')
  async addTableIgnore(@Body(ALL) table: TadTableIgnore): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableIgnore.save(table);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_table_ignore')
  async updateTableIgnore(@Body(ALL) table: TadTableIgnore): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableIgnore.update(table);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_table_ignore')
  async deleteTableIgnore(@Body(ALL) table: TadTableIgnore): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadTableIgnore.delete(table);
    restResult.data = data;

    return restResult;
  }

  // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********

  @Post('/get_table_indexes')
  async getTableIndexes(): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.findAll();

    return restResult;
  }

  @Post('/get_table_index')
  async getTableIndex(@Body(ALL) params: TadTableIndex): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.find(params);

    return restResult;
  }

  @Post('/add_table_index')
  async addTableIndex(@Body(ALL) params: TadTableIndex): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.save(params);

    return restResult;
  }

  @Post('/update_table_index')
  async updateTableIndex(@Body(ALL) params: TadTableIndex): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.update(params);

    return restResult;
  }

  @Post('/delete_table_index')
  async deleteTableIndex(@Body(ALL) params: TadTableIndex): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.delete(params);

    return restResult;
  }

  // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********

  @Post('/get_table_index_columns')
  async getTableIndexColumns(): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndex.findAll();

    return restResult;
  }

  @Post('/get_table_index_column')
  async getTableIndexColumn(@Body(ALL) params: TadTableIndexColumn): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndexColumn.find(params);

    return restResult;
  }

  @Post('/add_table_index_column')
  async addTableIndexColumn(@Body(ALL) params: TadTableIndexColumn): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndexColumn.save(params);

    return restResult;
  }

  @Post('/update_table_index_column')
  async updateTableIndexColumn(@Body(ALL) params: TadTableIndexColumn): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndexColumn.update(params);

    return restResult;
  }

  @Post('/delete_table_index_column')
  async deleteTableIndexColumn(@Body(ALL) params: TadTableIndexColumn): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableIndexColumn.delete(params);

    return restResult;
  }

  // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********

  @Post('/get_table_partitions')
  async getTablePartitions(): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTablePartition.findAll();

    return restResult;
  }

  @Post('/get_table_partition')
  async getTablePartition(@Body(ALL) params: TadTablePartition): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTablePartition.find(params);

    return restResult;
  }

  @Post('/add_table_partition')
  async addTablePartition(@Body(ALL) params: TadTablePartition): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTablePartition.save(params);

    return restResult;
  }

  @Post('/update_table_partition')
  async updateTablePartition(@Body(ALL) params: TadTablePartition): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTablePartition.update(params);

    return restResult;
  }

  @Post('/delete_table_partition')
  async deleteTablePartition(@Body(ALL) params: TadTablePartition): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTablePartition.delete(params);

    return restResult;
  }

  // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********

  @Post('/get_table_relations')
  async getTableRelations(): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableRelation.findAll();

    return restResult;
  }

  @Post('/get_table_relation')
  async getTableRelation(@Body(ALL) params: TadTableRelation): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableRelation.find(params);

    return restResult;
  }

  @Post('/add_table_relation')
  async addTableRelation(@Body(ALL) params: TadTableRelation): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableRelation.save(params);

    return restResult;
  }

  @Post('/update_table_relation')
  async updateTableRelation(@Body(ALL) params: TadTableRelation): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableRelation.update(params);

    return restResult;
  }

  @Post('/delete_table_relation')
  async deleteTableRelation(@Body(ALL) params: TadTableRelation): Promise<any> {

    let restResult = new RestResult();

    restResult.data = await this.coreTadTableRelation.delete(params);

    return restResult;
  }
}
