import { Inject, Controller, Post, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoreProductService } from '../service/core/product';
import {TadDbConnectionInfoService} from "../service/core/TadDbConnectionInfo";
import {OlcBatisService} from "../service/core/OlcBatis";
import {TadProductLineInfoService} from "../service/core/TadProductLineInfo";
import {TadProductInfoService} from "../service/core/TadProductInfo";
import {TadModuleInfoService} from "../service/core/TadModuleInfo";
import {TadProductRelService} from "../service/core/TadProductRel";
import {TadProductManagerInfoService} from "../service/core/TadProductManagerInfo";
import {TadProductVersionInfoService} from "../service/core/TadProductVersionInfo";
import {TadDbUserService} from "../service/core/TadDbUser";

@Provide()
@Controller('/api/core')
export class APICoreController {
  @Inject()
  ctx: Context;

  @Inject()
  coreProductService: CoreProductService;

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

  // @Post('/get_products')
  // async getProducts(): Promise<any> {
  //   if(this.ctx.message === "Not Found") {
  //     this.ctx.message = "get_products"
  //   } else {
  //     this.ctx.message += " > get_products";
  //   }
  //   const products = await this.coreProductService.getProducts();
  //   return { success: true, message: this.ctx.message, data: products };
  // }

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
    const myResult = await this.coreTadDbConnectionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_db_connection')
  async deleteDbConnection(): Promise<any> {
    const myResult = await this.coreTadDbConnectionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/get_products')
  async test(): Promise<any> {
    const myResult = await  this.coreOlcBatisService.getProducts();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_product_line')
  async addProductLine(): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_product_line')
  async updateProductLine(): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_product_line')
  async deleteProductLine(): Promise<any> {
    const myResult = await this.coreTadProductLineInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_product')
  async addProduct(): Promise<any> {
    const myResult = await this.coreTadProductInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_product')
  async updateProduct(): Promise<any> {
    const myResult = await this.coreTadProductInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_product')
  async deleteProduct(): Promise<any> {
    const myResult = await this.coreTadProductInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_module')
  async addModule(): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_module')
  async updateModule(): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_module')
  async deleteModule(): Promise<any> {
    const myResult = await this.coreTadModuleInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_product_rel')
  async addProductRel(): Promise<any> {
    const myResult = await this.coreTadProductRelService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_product_rel')
  async updateProductRel(): Promise<any> {
    const myResult = await this.coreTadProductRelService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_product_rel')
  async deleteProductRel(): Promise<any> {
    const myResult = await this.coreTadProductRelService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_product_manager')
  async addProductManager(): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_product_manager')
  async updateProductManager(): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_product_manager')
  async deleteProductManager(): Promise<any> {
    const myResult = await this.coreTadProductManagerInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_product_version')
  async addProductVersion(): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_product_version')
  async updateProductVersion(): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_product_version')
  async deleteProductVersion(): Promise<any> {
    const myResult = await this.coreTadProductVersionInfoService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/add_db_user')
  async addDbUser(): Promise<any> {
    const myResult = await this.coreTadDbUserService.save();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/update_db_user')
  async updateDbUser(): Promise<any> {
    const myResult = await this.coreTadDbUserService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }

  @Post('/delete_db_user')
  async deleteDbUser(): Promise<any> {
    const myResult = await this.coreTadDbUserService.findAll();
    return { success: true, message: this.ctx.message, data: myResult };
  }
}
