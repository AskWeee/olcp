import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadRtKpiCounter} from "../../entity/service/TadRtKpiCounter";
import {TadKpiOlog} from "../../entity/service/TadKpiOlog";
import moment from "moment";

@Provide()
export class TadRtKpiCounterService {
  @InjectEntityModel(TadRtKpiCounter)
  tableModel: Repository<TadRtKpiCounter>;

  @InjectEntityModel(TadKpiOlog)
  ologModel: Repository<TadKpiOlog>;

  async findAll() {
    return await this.tableModel.find({
      order: {
        counter_zhname: "ASC",
      }
    });
  }

  async find(params: TadRtKpiCounter) {
    return await this.tableModel.find({id: params.id});
  }

  async save(params: TadRtKpiCounter) {
    const newCounter = await this.tableModel.save(params);

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "add";
    olog.object_type = "counter";
    olog.object_id = newCounter.id;
    this.ologModel.save(olog);

    return newCounter;
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
    let oldCounter;

    if(params.id) {
      myObject = await this.tableModel.find({id: params.id});
      oldCounter = await this.tableModel.remove(myObject);

      let olog = new TadKpiOlog();
      olog.user_name = "KKK";
      olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
      olog.operation = "delete";
      olog.object_type = "counter";
      olog.object_id = params.id;
      this.ologModel.save(olog);
    } else if (params.sid) {
      myObject = await this.tableModel.find({sid: params.sid});
      oldCounter = await this.tableModel.remove(myObject);
    }

    //todo::暂时注释，忘了为什么要写这段了
    // if (params.id) {
    //   oldCounter.forEach((item) => {
    //     item.id = params.id
    //   })
    // }

    return oldCounter;
  }
}
