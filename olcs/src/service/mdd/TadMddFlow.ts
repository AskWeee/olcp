import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadMddFlow} from "../../entity/mdd/TadMddFlow";

@Provide()
export class TadMddFlowService {
  @InjectEntityModel(TadMddFlow)
  tableModel: Repository<TadMddFlow>;

  async find(params: TadMddFlow) {
    // if (params.mdd_flow_id === undefined || params.mdd_flow_id.toString() === '') return null;
    //
    // return await this.tableModel.find({mdd_flow_id: params.mdd_flow_id});
    return await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      },
      order: {
        content_index: "ASC"
      }
    });

  }

  async save(params: TadMddFlow) {
    // let myObject = new TadMddFlow();
    // myObject.mdd_flow_id = params.mdd_flow_id;
    // myObject.mdd_flow_content = params.mdd_flow_content;

    return await this.tableModel.save(params);
  }

  async update(params: TadMddFlow) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.flow_id = params.flow_id;
    myObject.flow_content = params.flow_content;
    myObject.content_index = params.content_index;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadMddFlow) {
    let myObjects = await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      }
    });

    return await this.tableModel.remove(myObjects);
  }
}
