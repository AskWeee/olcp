import {ALL, Body, Controller, Inject, Post, Provide} from '@midwayjs/decorator';
import {Context} from 'egg';
import {RestResult} from "./RestResult";
import {TadMddTreeService} from "../service/mdd/TadMddTree";
import {TadMddFlowService} from "../service/mdd/TadMddFlow";
import {TadMddTree} from "../entity/mdd/TadMddTree";
import {TadMddFlow} from "../entity/mdd/TadMddFlow";

@Provide()
@Controller('/api/mdd', { tagName: 'MDD Group', description: 'MDD相关API'})
export class APIMddController {
  @Inject()
  ctx: Context;

  @Inject()
  tadMddTreeService: TadMddTreeService;

  @Inject()
  tadMddFlowService: TadMddFlowService;

  @Post('/get_mdd_trees')
  async getMddTrees(): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddTreeService.findAll();

    return restResult;
  }

  @Post('/add_mdd_tree')
  async addMddTree(@Body(ALL) params: TadMddTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddTreeService.save(params);

    return restResult;
  }

  @Post('/update_mdd_tree')
  async updateMddTree(@Body(ALL) params: TadMddTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddTreeService.update(params);

    return restResult;
  }

  @Post('/delete_mdd_tree')
  async deleteMddTree(@Body(ALL) params: TadMddTree): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddTreeService.delete(params);

    return restResult;
  }

  @Post('/get_mdd_flow')
  async getMddFlow(@Body(ALL) params: TadMddFlow): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddFlowService.find(params);

    return restResult;
  }

  @Post('/add_mdd_flow')
  async addMddFlow(@Body(ALL) params: TadMddFlow): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddFlowService.save(params);

    return restResult;
  }

  @Post('/update_mdd_flow')
  async updateMddFlow(@Body(ALL) params: TadMddFlow): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddFlowService.update(params);

    return restResult;
  }

  @Post('/delete_mdd_flow')
  async deleteMddFlow(@Body(ALL) params: TadMddFlow): Promise<any> {
    let restResult = new RestResult();

    restResult.data = await this.tadMddFlowService.delete(params);

    return restResult;
  }
}
