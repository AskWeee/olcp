import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadHelpTree} from "../../entity/core/TadHelpTree";

@Provide()
export class TadHelpTreeService {
  @InjectEntityModel(TadHelpTree)
  tableModel: Repository<TadHelpTree>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        node_zhname: "ASC",
      },
    });
  }

  async find(params: TadHelpTree) {
    return await this.tableModel.find({
      where: {
        node_type: params.node_type
      }, order: {
        node_zhname: "ASC",
      },
    });
  }

  async save(params: TadHelpTree) {
    return await this.tableModel.save(params);
  }

  async update(params: TadHelpTree) {
    let myObject = await this.tableModel.findOne(params.uuid);

    myObject.node_zhname = params.node_zhname;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadHelpTree) {
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
