import {ALL, Body, Controller, Inject, Post, Provide} from '@midwayjs/decorator';
import {Context} from 'egg';
import {RestResult} from "./RestResult";
import {AlarmsStatusAnalysisService} from "../service/alarms/AlarmsStatusAnalysis";
import {TadDbConnectionInfo} from "../entity/core/TadDbConnectionInfo";
import {AlarmsQueueMonitorService} from "../service/alarms/AlarmsQueueMonitor";

@Provide()
@Controller('/api/alarms', { tagName: 'Alarms Group', description: '告警分析相关API'})
export class AlarmsController {
  @Inject()
  ctx: Context;

  @Inject()
  alarmsStatusAnalysisService: AlarmsStatusAnalysisService;

  @Inject()
  alarmsQueueMonitorService: AlarmsQueueMonitorService;

  @Post('/get_alarms_status_1407')
  async getAlarmsStatus1407(@Body(ALL) params: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.alarmsStatusAnalysisService.getAlarms1407(params);

    return restResult;
  }

  @Post('/get_alarms_queue_monitor')
  async getAlarmsQueueMonitor(@Body(ALL) params: TadDbConnectionInfo): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.alarmsQueueMonitorService.getAlarmsQueues(params);

    return restResult;
  }
}
