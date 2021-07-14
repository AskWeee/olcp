import {ALL, Body, Controller, Inject, Post, Provide} from '@midwayjs/decorator';
import {Context} from 'egg';
import {TadDbConnectionInfo} from "../entity/core/TadDbConnectionInfo";
import {TadDbConnectionInfoService} from "../service/core/TadDbConnectionInfo";
import {RestResult} from "./RestResult";
import {TadIndicator} from "../entity/service/TadIndicator";
import {TadIndicatorService} from "../service/service/TadIndicator";
import {TadRtKpiSchema} from "../entity/service/TadRtKpiSchema";
import {TadRtKpiSchemaService} from "../service/service/TadRtKpiSchema";
import {TadRtKpi} from "../entity/service/TadRtKpi";
import {TadRtKpiService} from "../service/service/TadRtKpi";
import {TadRtKpiCounter} from "../entity/service/TadRtKpiCounter";
import {TadRtKpiCounterService} from "../service/service/TadRtKpiCounter";
import {TadIndicatorCounter} from "../entity/service/TadIndicatorCounter";
import {TadIndicatorCounterService} from "../service/service/TadIndicatorCounter";
import {TadKpiDictService} from "../service/service/TadKpiDict";
import {TadNetworkTypeDefineService} from "../service/service/TadNetworkTypeDefine";
import {TadVendorNameService} from "../service/service/TadVendorName";
import {TadKpiOlogService} from "../service/service/TadKpiOlog";
import {KpiOlogParams} from "../params/KpiOlogParams";
import {TadCommTreeService} from "../service/service/TadCommTree";
import {TadProjectKpiService} from "../service/service/TadProjectKpi";
import {TadProjectKpi} from "../entity/service/TadProjectKpi";
import {TadCommTree} from "../entity/service/TadCommTree";

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

  @Inject()
  tadNetworkTypeDefineService: TadNetworkTypeDefineService;

  @Inject()
  tadVendorNameService: TadVendorNameService;

  @Inject()
  tadKpiOlogService: TadKpiOlogService;

  @Inject()
  tadCommTreeService: TadCommTreeService;

  @Post('/get_comm_trees')
  async getCommTrees(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadCommTreeService.findAll();

    return restResult;
  }

  @Post('/add_comm_tree')
  async addCommTree(@Body(ALL) params: TadCommTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadCommTreeService.save(params);

    return restResult;
  }

  @Post('/update_comm_tree')
  async updateCommTree(@Body(ALL) params: TadCommTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadCommTreeService.update(params);

    return restResult;
  }

  @Post('/delete_comm_tree')
  async deleteCommTree(@Body(ALL) params: TadCommTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadCommTreeService.delete(params);

    return restResult;
  }

  @Inject()
  tadProjectKpiService: TadProjectKpiService;

  @Post('/get_project_kpis')
  async getProjectKpis(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadProjectKpiService.findAll();

    return restResult;
  }

  @Post('/add_project_kpi')
  async addProjectKpi(@Body(ALL) params: TadProjectKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadProjectKpiService.save(params);

    return restResult;
  }

  @Post('/update_project_kpi')
  async updateProjectKpi(@Body(ALL) params: TadProjectKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadProjectKpiService.update(params);

    return restResult;
  }

  @Post('/delete_project_kpi')
  async deleteProjectKpi(@Body(ALL) params: TadProjectKpi): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadProjectKpiService.delete(params);

    return restResult;
  }

  @Post('/get_kpi_ologs')
  async getKpiOlogs(@Body(ALL) params: KpiOlogParams): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiOlogService.find(params);

    return restResult;
  }

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

  @Post('/get_kpi_dict')
  async getKpiDict(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiDictService.findAll();

    return restResult;
  }

  @Post('/get_object_defs')
  async getObjectDefs(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadNetworkTypeDefineService.findAll();

    return restResult;
  }

  @Post('/get_vendors')
  async getVendors(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadVendorNameService.findAll();

    return restResult;
  }


  @Post('/get_kpi_counters')
  async getKpiCounters(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiCounterService.findAll();

    return restResult;
  }

  @Post('/delete_kpi_counter')
  async deleteKpiCounter(@Body(ALL) params: TadRtKpiCounter): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiCounterService.delete(params);

    return restResult;
  }

  @Post('/fix_kpi_counter')
  async fixKpiCounter(@Body(ALL) params: TadRtKpiCounter): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiCounterService.fix(params);

    return restResult;
  }

  @Post('/add_kpi_counter')
  async addKpiCounter(@Body(ALL) params: TadRtKpiCounter): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiCounterService.save(params);

    return restResult;
  }

  @Post('/get_kpi_schemas')
  async getKpiSchemas(@Body(ALL) connInfo: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.findAll();

    return restResult;
  }

  @Post('/add_kpi_schema')
  async addKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.save(params);

    return restResult;
  }

  @Post('/update_kpi_schema')
  async updateKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.update(params);

    return restResult;
  }

  @Post('/delete_kpi_schema')
  async deleteKpiSchema(@Body(ALL) params: TadRtKpiSchema): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadKpiSchemaService.delete(params);

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
  async getIndicators(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadIndicatorService.findAll();

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
}
