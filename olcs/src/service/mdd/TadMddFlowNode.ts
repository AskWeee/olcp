import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadMddFlowNode} from "../../entity/mdd/TadMddFlowNode";

@Provide()
export class TadMddFlowNodeService {
  @InjectEntityModel(TadMddFlowNode)
  tableModel: Repository<TadMddFlowNode>;

  async find(params: TadMddFlowNode) {
    return await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      }
    });

  }

  async save(params: TadMddFlowNode) {
    return await this.tableModel.save(params);
  }

  async update(params: TadMddFlowNode) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.position_x = params.position_x;
    myObject.position_y = params.position_y;
    myObject.node_label = params.node_label;
    myObject.node_name = params.node_name;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadMddFlowNode) {
    let myObjects = await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      }
    });

    return await this.tableModel.remove(myObjects);
  }
}
