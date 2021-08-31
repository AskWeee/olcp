import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadTableErTree} from "../../entity/core/TadTableErTree";
import {TadTableEr} from "../../entity/core/TadTableEr";

@Provide()
export class TadTableErTreeService {
  @InjectEntityModel(TadTableErTree)
  tableModel: Repository<TadTableErTree>;

  @InjectEntityModel(TadTableEr)
  erModel: Repository<TadTableEr>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        node_zhname: "ASC",
      },
    });
  }

  async find(params: TadTableErTree) {
    return await this.tableModel.find({
      where: {
        node_type: params.node_type
      }, order: {
        node_zhname: "ASC",
      },
    });
  }

  async save(params: TadTableErTree) {
    let myResult = await this.tableModel.save(params);

    if (params.node_type === "NODE_ER_DIAGRAM") {
      let myEr = new TadTableEr();
      myEr.er_id = myResult.uuid;
      myEr.er_content = "{}";
      await this.erModel.save(myEr);
    }

    return myResult
  }

  async update(params: TadTableErTree) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.node_zhname = params.node_zhname;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableErTree) {
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
