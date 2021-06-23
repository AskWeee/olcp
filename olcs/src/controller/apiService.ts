import {Inject, Controller, Post, Provide, ALL, Body} from '@midwayjs/decorator';
import {Context} from 'egg';
import {TadDbConnectionInfoService} from "../service/core/TadDbConnectionInfo";
import {TadDbConnectionInfo} from "../entity/TadDbConnectionInfo";
import {RestResult} from "./RestResult";
import {TadIndicator} from "../entity/TadIndicator";
import {TadIndicatorService} from "../service/core/TadIndicator";
import {TadRtKpiService} from "../service/core/TadRtKpi";
import {TadRtKpiSchemaService} from "../service/core/TadRtKpiSchema";
import {TadRtKpiSchema} from "../entity/TadRtKpiSchema";
import {TadRtKpi} from "../entity/TadRtKpi";
import {TadRtKpiCounterService} from "../service/core/TadRtKpiCounter";
import {TadIndicatorCounterService} from "../service/core/TadIndicatorCounter";
import {TadIndicatorCounter} from "../entity/TadIndicatorCounter";
import {TadKpiDictService} from "../service/core/TadKpiDict";

@Provide()
@Controller('/api/service', { tagName: 'Service Group', description: '系统服务管理相关API'})
export class APIServiceController {
  @Inject()
  ctx: Context;

  @Inject()
  coreTadDbConnectionInfoService: TadDbConnectionInfoService;

  @Inject()
  tadIndicatorService: TadIndicatorService;

  @Inject()
  tadIndicatorCounterService: TadIndicatorCounterService;

  @Inject()
  tadKpiService: TadRtKpiService;

  @Inject()
  tadKpiSchemaService: TadRtKpiSchemaService;

  @Inject()
  tadKpiCounterService: TadRtKpiCounterService;

  @Inject()
  tadKpiDictService: TadKpiDictService;

  @Post('/get_kpis_oracle')
  async getKpisOracle(@Body(ALL) connInfo: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    const result = await this.coreTadDbConnectionInfoService.getKpis(connInfo);
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  @Post('/get_kpi_counters')
  async getKpiCounters(): Promise<any> {
    let restResult = new RestResult();

    const result = await this.tadKpiCounterService.findAll();
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  @Post('/get_kpi_schemas')
  async getKpiSchemas(@Body(ALL) connInfo: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    const result = await this.tadKpiSchemaService.findAll();
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  @Post('/add_kpi_schema')
  async addKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.save(params);

    console.log(restResult);
    return restResult;
  }

  @Post('/update_kpi_schema')
  async updateKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.update(params);

    console.log(restResult);
    return restResult;
  }

  @Post('/delete_kpi_schema')
  async deleteKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.delete(params);

    console.log(restResult);
    return restResult;
  }

  @Post('/get_kpis')
  async getKpis(@Body(ALL) connInfo: TadRtKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiService.findAll();

    return restResult;
  }

  @Post('/add_kpi')
  async addKpi(@Body(ALL) params: TadRtKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiService.save(params);

    return restResult;
  }

  @Post('/update_kpi')
  async updateKpi(@Body(ALL) params: TadRtKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiService.update(params);

    return restResult;
  }

  @Post('/delete_kpi')
  async deleteKpi(@Body(ALL) params: TadRtKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiService.delete(params);

    return restResult;
  }

  @Post('/get_indicators')
  async getIndicators(@Body(ALL) indicator: TadIndicator): Promise<any> {
    let restResult = new RestResult();

    const result = await this.tadIndicatorService.findAll();
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  @Post('/add_indicator')
  async addIndicator(@Body(ALL) indicator: TadIndicator): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadIndicatorService.save(indicator);

    return restResult;
  }

  @Post('/get_indicator_counters')
  async getIndicatorCounters(): Promise<any> {
    let restResult = new RestResult();

    const result = await this.tadIndicatorCounterService.findAll();
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }

  @Post('/add_indicator_counter')
  async addIndicatorCounter(@Body(ALL) params: TadIndicatorCounter): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadIndicatorCounterService.save(params);

    return restResult;
  }

  @Post('/get_kpi_dict')
  async getKpiDict(): Promise<any> {
    let restResult = new RestResult();
    let result = await this.tadKpiDictService.findAll();

    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

    return restResult;
  }
}
