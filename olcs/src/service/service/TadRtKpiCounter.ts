import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadRtKpiCounter} from "../../entity/service/TadRtKpiCounter";

@Provide()
export class TadRtKpiCounterService {
  @InjectEntityModel(TadRtKpiCounter)
  tableModel: Repository<TadRtKpiCounter>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadRtKpiCounter) {
    return await this.tableModel.find({id: params.id});
  }

  async save(params: TadRtKpiCounter) {
    return await this.tableModel.save(params);
  }

  async fix(params: TadRtKpiCounter) {
    let myObject;

    if(params.schema_id2) {
      myObject = await this.tableModel.find({schema_id2: params.schema_id2});
      myObject.forEach((item) => {
        item.sid = params.sid;
      })
    }

    return await this.tableModel.save(myObject);
  }

  async delete(params: TadRtKpiCounter) {
    let myObject;

    if(params.id) {
      myObject = await this.tableModel.find({id: params.id});
    } else if (params.sid) {
      myObject = await this.tableModel.find({sid: params.sid});
    }

    let data = await this.tableModel.remove(myObject);
    if (params.id) {
      data.forEach((item) => {
        item.id = params.id
      })
    }
    console.log(data);
    return data;
  }
}
