import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {RestResult} from "../../controller/RestResult";
import {TadKpiDict} from "../../entity/TadKpiDict";

@Provide()
export class TadKpiDictService {
  @InjectEntityModel(TadKpiDict)
  tableModel: Repository<TadKpiDict>;

  async findAll() {
    let restResult = new RestResult();
    let myResult = await this.tableModel.find();

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return restResult;
  }

  async find(params: TadKpiDict) {
    let restResult = new RestResult();
    let myResult = await this.tableModel.find({type: params.type, id: params.id});

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async save(params: TadKpiDict) {
    let restResult = new RestResult();
    let myResult = await this.tableModel.save(params);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async update(params: TadKpiDict) {
    let restResult = new RestResult();
    let myObject = await this.tableModel.findOne({type: params.type, id: params.id});
    let myResult = await this.tableModel.save(myObject);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async delete(params: TadKpiDict) {
    let restResult = new RestResult();
    let myObject = await this.tableModel.find({type: params.type, id: params.id});
    let myResult = await this.tableModel.remove(myObject);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }
}
