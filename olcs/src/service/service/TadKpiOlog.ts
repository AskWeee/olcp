import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Between } from 'typeorm';
import {TadKpiOlog} from "../../entity/service/TadKpiOlog";
import {TimePairs} from "../../params/TimePairs";

@Provide()
export class TadKpiOlogService {
  @InjectEntityModel(TadKpiOlog)
  tableModel: Repository<TadKpiOlog>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        event_time: "ASC",
      },
    });
  }

  async find(params: TimePairs) {
    let myResult;

    if (params.tb && params.te) {
      myResult = await this.tableModel.find({
        where: {
          event_time: Between(params.tb, params.te)
        },
        order: {
          event_time: "ASC",
        },
      });
    }

    return myResult;
  }

  async save(params: TadKpiOlog) {
    return await this.tableModel.save(params);
  }

  async delete(params: TimePairs) {
    let myObject;

    if (params.tb && params.te) {
      myObject = await this.tableModel.find({
        event_time: Between(params.tb, params.te)
      });

      return await this.tableModel.remove(myObject);
    }
  }
}
