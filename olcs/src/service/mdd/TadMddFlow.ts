import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadMddFlow} from "../../entity/mdd/TadMddFlow";

@Provide()
export class TadMddFlowService {
  @InjectEntityModel(TadMddFlow)
  tableModel: Repository<TadMddFlow>;

  async find(params: TadMddFlow) {
    if (params.mdd_flow_id === undefined || params.mdd_flow_id.toString() === '') return null;

    return await this.tableModel.findOne({mdd_flow_id: params.mdd_flow_id});
  }

  async save(params: TadMddFlow) {
    let myObject = new TadMddFlow();
    myObject.mdd_flow_id = params.mdd_flow_id;
    myObject.mdd_flow_content = params.mdd_flow_content;

    return await this.tableModel.save(myObject);
  }

  async update(params: TadMddFlow) {
    let myObject = await this.tableModel.findOne(params.mdd_flow_id);

    myObject.mdd_flow_content = params.mdd_flow_content;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadMddFlow) {
    let myObject = await this.tableModel.findOne(params.mdd_flow_id);

    return await this.tableModel.remove(myObject);
  }
}
