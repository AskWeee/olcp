import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {RestResult} from "../../controller/RestResult";
import {TadIndicatorCounter} from "../../entity/service/TadIndicatorCounter";

@Provide()
export class TadIndicatorCounterService {
  @InjectEntityModel(TadIndicatorCounter)
  tableModel: Repository<TadIndicatorCounter>;

  async findAll() {
    let restResult = new RestResult();
    let myResult = await this.tableModel.find({
      order: {
        counter_zhname: "ASC",
      }
    });

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return restResult;
  }

  async find(params: TadIndicatorCounter) {
    let myResult = null;

    if (params.id) {
       myResult = await this.tableModel.find({id: params.id});
    }

    return myResult;
  }

  async save(params: TadIndicatorCounter) {
    const myResult = await this.tableModel.save(params);

    return myResult;
  }

  async update(params: TadIndicatorCounter) {
    let myObject = await this.tableModel.findOne(params.id);

    // myObject.indicator_code = params.indicator_code;
    // myObject.indicator_name = params.indicator_name;
    // myObject.indicator_desc = params.indicator_desc;
    // myObject.indicator_definition = params.indicator_definition;
    // myObject.counter_code = params.counter_code;
    // myObject.counter_zhname = params.counter_zhname;
    // myObject.counter_enname = params.counter_enname;
    // myObject.counter_zhexp = params.counter_zhexp;
    // myObject.counter_enexp = params.counter_enexp;
    // myObject.counter_time_type = params.counter_time_type;
    // myObject.counter_geo_type = params.counter_geo_type;
    // myObject.counter_unit = params.counter_unit;
    // myObject.counter_geo = params.counter_geo;
    // myObject.counter_time = params.counter_time;
    // myObject.counter_desc = params.counter_desc;
    // myObject.counter_tab_name = params.counter_tab_name;
    // myObject.real_tab_name = params.real_tab_name;
    // myObject.real_tab_col_name = params.real_tab_col_name;
    // myObject.kpi_tab_name = params.kpi_tab_name;
    // myObject.kpi_tab_col_name = params.kpi_tab_col_name;
    // myObject.kpi_exp = params.kpi_exp;
    // myObject.kpi_exp_desc = params.kpi_exp_desc;
    // myObject.kpi_index = params.kpi_index;
    // myObject.kpi_value_format = params.kpi_value_format;
    // myObject.kpi_value_min = params.kpi_value_min;
    // myObject.kpi_value_max = params.kpi_value_max;

    const myResult = await this.tableModel.save(myObject);

    return myResult;
  }

  async delete(params: TadIndicatorCounter) {
    let myObject = [];

    if (params.id) {
      myObject = await this.tableModel.find({id: params.id});
    } else if (params.indicator_id) {
      myObject = await this.tableModel.find({indicator_id: params.indicator_id});
    }

    const myResult = await this.tableModel.remove(myObject);

    return myResult;
  }
}
