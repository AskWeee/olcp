import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadVendorName} from "../../entity/service/TadVendorName";

@Provide()
export class TadVendorNameService {
  @InjectEntityModel(TadVendorName)
  tableModel: Repository<TadVendorName>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        type: "ASC",
      }
    });
  }
}
