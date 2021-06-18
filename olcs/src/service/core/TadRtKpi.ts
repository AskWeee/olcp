import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {RestResult} from "../../controller/RestResult";
import {TadRtKpi} from "../../entity/TadRtKpi";

@Provide()
export class TadRtKpiService {
  @InjectEntityModel(TadRtKpi)
  tableModel: Repository<TadRtKpi>;

  async findAll() {
    let restResult = new RestResult();

    let myResult = await this.tableModel.find();

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return restResult;
  }

  async find(params: TadRtKpi) {
    if ((params.kpi_id) && (params.schema_id)) return null

    let myResult = null;
    if (params.kpi_id) {
       myResult = await this.tableModel.find({kpi_id: params.kpi_id});
    } else if (params.schema_id) {
      myResult = await this.tableModel.find({schema_id: params.schema_id});
    }

    return myResult;
  }

  async save(params: TadRtKpi) {

    const myResult = await this.tableModel.save(params);

    return myResult;
  }

  async update(params: TadRtKpi) {

    let myObject = await this.tableModel.findOne(params.id);

    myObject.schema_id = params.schema_id;
    // myObject = params;
    // myObject = params;
    // myObject = params;
    // myObject = params;
    // myObject = params;
    // myObject = params;

    const myResult = await this.tableModel.save(myObject);

    return myResult;
  }

  async delete(params: TadRtKpi) {

    //if ((params.id) && (params.table_id)) return null

    let myObject = [];
    if (params.kpi_id) {
      myObject = await this.tableModel.find({kpi_id: params.kpi_id});
    } else if (params.schema_id) {
      myObject = await this.tableModel.find({schema_id: params.schema_id});
    }

    const myResult = await this.tableModel.remove(myObject);

    return myResult;
  }
}
