import { Inject, Controller, Post, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoreProductService } from '../service/core/product';
import {TadDbConnectionInfoService} from "../service/core/TadDbConnectionInfo";

@Provide()
@Controller('/api/core')
export class APICoreController {
  @Inject()
  ctx: Context;

  @Inject()
  coreProductService: CoreProductService;

  @Inject()
  coreTadDbConnectionInfoService: TadDbConnectionInfoService;

  @Post('/get_products')
  async getProducts(): Promise<any> {
    if(this.ctx.message === "Not Found") {
      this.ctx.message = "get_products"
    } else {
      this.ctx.message += " > get_products";
    }
    const products = await this.coreProductService.getProducts();
    return { success: true, message: this.ctx.message, data: products };
  }

  @Post('/get_product')
  async getProduct(@Query() id: string): Promise<any> {
    if(this.ctx.message === "Not Found") {
      this.ctx.message = "get_product"
    } else {
      this.ctx.message += " > get_product";
    }
    const product = await this.coreProductService.getProduct(id);
    return { success: true, message: this.ctx.message, data: product };
  }

  @Post('/get_db_connections')
  async getDbConnections(): Promise<any> {
    if(this.ctx.message === "Not Found") {
      this.ctx.message = "get_db_connections"
    } else {
      this.ctx.message += " > get_db_connections";
    }
    const data = await this.coreTadDbConnectionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: data };
  }

  @Post('/get_db_connection')
  async getDbConnection(@Query() id: number): Promise<any> {
    const myResult = await this.coreTadDbConnectionInfoService.find(id);
    return { success: true, message: this.ctx.message, data: myResult };
    /*
    import { ALL } from "@midwayjs/decorator";
    async getUser(@Query(ALL) queryObject: object)  // queryObject = {"id": 1}
     */
  }

  @Post('/add_db_connection')
  async addDbConnection(): Promise<any> {
    const myResult = await this.coreTadDbConnectionInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_db_connection')
  async updateDbConnection(): Promise<any> {
    const data = await this.coreTadDbConnectionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: data };
  }

  @Post('/delete_db_connection')
  async deleteDbConnection(): Promise<any> {
    const data = await this.coreTadDbConnectionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: data };
  }
}
