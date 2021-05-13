import {Provide} from '@midwayjs/decorator';
import {CoreProduct} from "../../model/core/CoreProduct";

@Provide()
export class CoreProductService {
  async getProducts() {
    return [
      {
        id: '1',
        name: '低代码平台',
        manger_id: '1',
        version_id: '1',
      },
      {
        id: '2',
        name: '移动故障管理系统',
        manger_id: '2',
        version_id: '2',
      }
    ];
  }

  async getProduct(id: string) {
    let product = new CoreProduct();

    if (id === '1') {
      product.id = "1";
      product.name = "";
      product.manager_id = "1";
      product.version_id = "1";
    }

    return product;
  }
}
