import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadRtKpi} from "../../entity/service/TadRtKpi";
import {TadKpiOlog} from "../../entity/service/TadKpiOlog";
import moment from "moment";

@Provide()
export class TadRtKpiService {
  @InjectEntityModel(TadRtKpi)
  tableModel: Repository<TadRtKpi>;

  @InjectEntityModel(TadKpiOlog)
  ologModel: Repository<TadKpiOlog>;

  async findAll() {
    return await this.tableModel.find({
        order: {
          kpi_zhname: "ASC",
          kpi_field: "ASC",
        }
      });
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
    const newKpi = await this.tableModel.save(params);

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "add";
    olog.object_type = "kpi";
    olog.object_id = newKpi.id;
    this.ologModel.save(olog);

    return newKpi;
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

    const newKpi = await this.tableModel.save(myObject);

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "update";
    olog.object_type = "kpi";
    olog.object_id = newKpi.id;
    this.ologModel.save(olog);

    return newKpi;
  }

  async delete(params: TadRtKpi) {
    let myObject;
    let oldKpi;

    if (params.id) {
      myObject = await this.tableModel.find({id: params.id});
      oldKpi = await this.tableModel.remove(myObject);

      let olog = new TadKpiOlog();
      olog.user_name = "KKK";
      olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
      olog.operation = "delete";
      olog.object_type = "kpi";
      olog.object_id = params.id;
      this.ologModel.save(olog);
    } else if (params.sid) {
      myObject = await this.tableModel.find({sid: params.sid});
      oldKpi = await this.tableModel.remove(myObject);
    }

    return oldKpi;
  }
}
