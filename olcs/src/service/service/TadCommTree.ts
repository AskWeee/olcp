import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadCommTree} from "../../entity/service/TadCommTree";

@Provide()
export class TadCommTreeService {
  @InjectEntityModel(TadCommTree)
  tableModel: Repository<TadCommTree>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        node_zhname: "ASC",
      },
    });
  }

  async find(params: TadCommTree) {
    return await this.tableModel.find({
      where: {
        node_type: params.node_type
      }, order: {
        node_zhname: "ASC",
      },
    });
  }

  async save(params: TadCommTree) {
    return await this.tableModel.save(params);
  }

  async update(params: TadCommTree) {
    let myObject = await this.tableModel.findOne(params.id);

    myObject.node_zhname = params.node_zhname;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadCommTree) {
    let myObject;

    console.log(params);
    if (params.id !== null) {
      myObject = await this.tableModel.findOne({
        id: params.id
      });

      console.log(myObject);
      return await this.tableModel.remove(myObject);
    }
  }
}
