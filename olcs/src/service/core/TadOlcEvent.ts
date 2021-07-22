import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadOlcEvent} from "../../entity/core/TadOlcEvent";

@Provide()
export class TadOlcEventService {
  @InjectEntityModel(TadOlcEvent)
  tableModel: Repository<TadOlcEvent>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadOlcEvent) {
    return await this.tableModel.findOne({uuid: params.uuid});
  }

  async save(params: TadOlcEvent) {
    return await this.tableModel.save(params);
  }

  async update(params: TadOlcEvent) {
    let myObject = await this.tableModel.findOne(params.uuid);

    if (params.title !== null) myObject.title = params.title;
    if (params.desc !== null) myObject.desc = params.desc;
    if (params.type !== null) myObject.type = params.type;
    if (params.customer !== null) myObject.customer = params.customer;
    if (params.developer !== null) myObject.developer = params.developer;
    if (params.status !== null) myObject.status = params.status;
    if (params.time_created !== null) myObject.time_created = params.time_created;
    if (params.time_closed !== null) myObject.time_closed = params.time_closed;

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadOlcEvent) {
    let myObject = await this.tableModel.findOne({uuid: params.uuid});

    return await this.tableModel.remove(myObject);
  }
}
