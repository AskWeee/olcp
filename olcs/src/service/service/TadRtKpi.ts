import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadRtKpi} from "../../entity/service/TadRtKpi";

@Provide()
export class TadRtKpiService {
  @InjectEntityModel(TadRtKpi)
  tableModel: Repository<TadRtKpi>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadRtKpi) {
    let myResult;

    if (params.id) {
       myResult = await this.tableModel.find({id: params.id});
    } else if (params.sid) {
      myResult = await this.tableModel.find({sid: params.sid});
    }

    return myResult;
  }

  async save(params: TadRtKpi) {
    return await this.tableModel.save(params);
  }

  async update(params: TadRtKpi) {
    let myObject = await this.tableModel.findOne(params.id);

    if (params.kpi_id !== null) myObject.kpi_id = params.kpi_id;
    if (params.kpi_field !== null) myObject.kpi_field = params.kpi_field;
    if (params.kpi_zhname !== null) myObject.kpi_zhname = params.kpi_zhname;
    if (params.kpi_enname !== null) myObject.kpi_enname = params.kpi_enname;
    if (params.kpi_alarm !== null) myObject.kpi_alarm = params.kpi_alarm;
    if (params.kpi_format !== null) myObject.kpi_format = params.kpi_format;
    if (params.kpi_min_value !== null) myObject.kpi_min_value = params.kpi_min_value;
    if (params.kpi_max_value !== null) myObject.kpi_max_value = params.kpi_max_value;
    if (params.kpi_exp !== null) myObject.kpi_exp = params.kpi_exp;
    if (params.used_info !== null) myObject.used_info = params.used_info;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadRtKpi) {
    let myObject;

    if (params.id) {
      myObject = await this.tableModel.find({id: params.id});
    } else if (params.sid) {
      myObject = await this.tableModel.find({sid: params.sid});
    }

    return await this.tableModel.remove(myObject);
  }
}
