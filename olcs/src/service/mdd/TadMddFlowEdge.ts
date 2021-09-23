import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadMddFlowEdge} from "../../entity/mdd/TadMddFlowEdge";

@Provide()
export class TadMddFlowEdgeService {
  @InjectEntityModel(TadMddFlowEdge)
  tableModel: Repository<TadMddFlowEdge>;

  async find(params: TadMddFlowEdge) {
    return await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      }
    });

  }

  async save(params: TadMddFlowEdge) {
    return await this.tableModel.save(params);
  }

  async update(params: TadMddFlowEdge) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.edge_label = params.edge_label;
    myObject.edge_name = params.edge_name;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadMddFlowEdge) {
    let myObjects = await this.tableModel.find({
      where: {
        flow_id: params.flow_id
      }
    });

    return await this.tableModel.remove(myObjects);
  }
}
