import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadDbUser} from "../../entity/core/TadDbUser";

@Provide()
export class TadDbUserService {
  @InjectEntityModel(TadDbUser)
  tableModel: Repository<TadDbUser>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadDbUser) {
    if (params.user_id === null) return null;

    return await this.tableModel.findOne({user_id: params.user_id});
  }

  async save(params: TadDbUser) {
    return await this.tableModel.save(params);
  }

  async update(params: TadDbUser) {
    let myObject = await this.tableModel.findOne(params.user_id);

    if (params.user_name !== null) myObject.user_name = params.user_name;
    if (params.user_desc !== null) myObject.user_desc = params.user_desc;
    if (params.product_line_id !== null) myObject.product_line_id = params.product_line_id;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadDbUser) {
    let myObject = await this.tableModel.findOne(params.user_id);

    return await this.tableModel.remove(myObject);
  }
}
