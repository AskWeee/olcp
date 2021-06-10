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

  @Post('/get_kpis')
  async getKpis(@Body(ALL) connInfo: TadRtKpi): Promise<any> {
    let restResult = new RestResult();

    const result = await this.tadKpiService.findAll();
    if (result.success) {
      restResult.data = result.data;
    } else {
      restResult.code = result.code;
      restResult.success = false;
      restResult.message = result.message;
    }

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

    const data = await this.tadIndicatorService.save(indicator);
    restResult.data = data;

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
}
