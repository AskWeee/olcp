import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadTableErTree} from "../../entity/core/TadTableErTree";

@Provide()
export class TadTableErTreeService {
  @InjectEntityModel(TadTableErTree)
  tableModel: Repository<TadTableErTree>;

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
    return await this.tableModel.save(params);
  }

  async update(params: TadTableErTree) {
    let myObject = await this.tableModel.findOne(params.id);

    myObject.node_zhname = params.node_zhname;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadTableErTree) {
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
