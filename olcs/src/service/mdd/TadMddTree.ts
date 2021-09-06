import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadMddTree} from "../../entity/mdd/TadMddTree";
import {TadMddFlow} from "../../entity/mdd/TadMddFlow";

@Provide()
export class TadMddTreeService {
  @InjectEntityModel(TadMddTree)
  tableModel: Repository<TadMddTree>;

  @InjectEntityModel(TadMddFlow)
  erModel: Repository<TadMddFlow>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        node_zhname: "ASC",
      },
    });
  }

  async find(params: TadMddTree) {
    return await this.tableModel.find({
      where: {
        node_type: params.node_type
      }, order: {
        node_zhname: "ASC",
      },
    });
  }

  async save(params: TadMddTree) {
    let myResult = await this.tableModel.save(params);

    if (params.node_type === "NODE_MDD_FLOW") {
      let myEr = new TadMddFlow();
      myEr.mdd_flow_id = myResult.uuid;
      myEr.mdd_flow_content = "{}";
      await this.erModel.save(myEr);
    }

    return myResult
  }

  async update(params: TadMddTree) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.node_zhname = params.node_zhname;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadMddTree) {
    let myObject;

    console.log(params);
    if (params.uuid !== null) {
      myObject = await this.tableModel.findOne({
        uuid: params.uuid
      });

      console.log(myObject);
      return await this.tableModel.remove(myObject);
    }
  }
}
