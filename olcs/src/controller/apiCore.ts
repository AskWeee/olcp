import {Inject, Controller, Post, Provide, ALL, Body} from '@midwayjs/decorator';
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
import {RestResult} from "./RestResult";
import {TadProductLineInfo} from "../entity/TadProductLineInfo";
import {TadProductInfo} from "../entity/TadProductInfo";
import {TadModuleInfo} from "../entity/TadModuleInfo";
import {TadProductRel} from "../entity/TadProductRel";
import {TadProductManagerInfo} from "../entity/TadProductManagerInfo";
import {TadProductVersionInfo} from "../entity/TadProductVersionInfo";
import {TadDbUser} from "../entity/TadDbUser";
import {TadTable} from "../entity/TadTable";
import {TadTableColumn} from "../entity/TadTableColumn";

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

  @Post('/get_tables')
  async getTables(): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreOlcBatisService.getTables();
    restResult.data = data;

    return restResult;
  }

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

  @Post('/get_products')
  async getProducts(): Promise<any> {
    let restResult = new RestResult();

    const myResult = await this.coreOlcBatisService.getProducts();
    restResult.data = myResult;

    return restResult;
  }

  @Post('/add_product_line')
  async addProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.save(productLine.product_line_name, productLine.product_line_desc);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_line')
  async updateProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.update(productLine.product_line_id, productLine.product_line_name, productLine.product_line_desc);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_line')
  async deleteProductLine(@Body(ALL) productLine: TadProductLineInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductLineInfoService.delete(productLine.product_line_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product')
  async addProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.save(product.product_name, product.product_desc);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product')
  async updateProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.update(product.product_id, product.product_name, product.product_desc);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product')
  async deleteProduct(@Body(ALL) product: TadProductInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductInfoService.delete(product.product_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/add_module')
  async addModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.save(module.module_name, module.module_desc, module.module_leader);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_module')
  async updateModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.update(module.module_id, module.module_name, module.module_desc, module.module_leader);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_module')
  async deleteModule(@Body(ALL) module: TadModuleInfo): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadModuleInfoService.delete(module.module_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/add_product_rel')
  async addProductRel(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.save(productRel.product_line_id, productRel.product_id, productRel.product_manager_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/update_product_rel')
  async updateProductRel(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.update(productRel.product_rel_id, productRel.product_line_id, productRel.product_id, productRel.product_manager_id);
    restResult.data = data;

    return restResult;
  }

  @Post('/delete_product_rel')
  async deleteProductRel(@Body(ALL) productRel: TadProductRel): Promise<any> {
    let restResult = new RestResult();

    const data = await this.coreTadProductRelService.delete(productRel.product_rel_id);
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

    const data = await this.coreTadTable.delete(table.table_id);
    restResult.data = data;

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

    const data = await this.coreTadTableColumn.delete(column.column_id);
    restResult.data = data;

    return restResult;
  }
}
