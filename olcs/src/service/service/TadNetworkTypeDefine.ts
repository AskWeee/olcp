import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadNetworkTypeDefine} from "../../entity/service/TadNetworkTypeDefine";

@Provide()
export class TadNetworkTypeDefineService {
  @InjectEntityModel(TadNetworkTypeDefine)
  tableModel: Repository<TadNetworkTypeDefine>;

  async findAll() {
    return await this.tableModel.find();
  }
}
