import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadKpiDict} from "../../entity/service/TadKpiDict";

@Provide()
export class TadKpiDictService {
  @InjectEntityModel(TadKpiDict)
  tableModel: Repository<TadKpiDict>;

  //todo 排序
  async findAll() {
    return await this.tableModel.find({
      order: {
        type_name: "ASC",
      }
    });
  }
}
