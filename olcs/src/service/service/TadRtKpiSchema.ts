import {Inject, Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadRtKpiSchema} from "../../entity/service/TadRtKpiSchema";
import {TadKpiOlog} from "../../entity/service/TadKpiOlog";
import moment from "moment";
import {TadRtKpi} from "../../entity/service/TadRtKpi";
import {TadRtKpiCounter} from "../../entity/service/TadRtKpiCounter";
import {TadRtKpiService} from "./TadRtKpi";
import {TadRtKpiCounterService} from "./TadRtKpiCounter";

@Provide()
export class TadRtKpiSchemaService {
  @InjectEntityModel(TadRtKpiSchema)
  tableModel: Repository<TadRtKpiSchema>;

  @InjectEntityModel(TadRtKpi)
  kpiModel: Repository<TadRtKpi>;

  @InjectEntityModel(TadRtKpiCounter)
  counterModel: Repository<TadRtKpiCounter>;

  @InjectEntityModel(TadKpiOlog)
  ologModel: Repository<TadKpiOlog>;

  @Inject()
  tadKpiService: TadRtKpiService;

  @Inject()
  tadKpiCounterService: TadRtKpiCounterService;

  async findAll() {
    return await this.tableModel.find({
      order: {
        schema_zhname: "ASC",
      }
    });
  }

  async find(params: TadRtKpiSchema) {
    return await this.tableModel.find({id: params.id});
  }

  async save(params: TadRtKpiSchema) {
    const newSchema = await this.tableModel.save(params);

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "add";
    olog.object_type = "schema";
    olog.object_id = newSchema.id;
    this.ologModel.save(olog);

    return newSchema;
  }

  async update(params: TadRtKpiSchema) {
    let myObject = await this.tableModel.findOne(params.id);

    if (params.schema_id !== null) myObject.schema_id = params.schema_id;
    if (params.schema_ns !== null) myObject.schema_ns = params.schema_ns;
    if (params.schema_zhname !== null) myObject.schema_zhname = params.schema_zhname;
    if (params.schema_enname !== null) myObject.schema_enname = params.schema_enname;
    if (params.vendor_id !== null) myObject.vendor_id = params.vendor_id;
    if (params.object_class !== null) myObject.object_class = params.object_class;
    if (params.sub_class !== null) myObject.sub_class = params.sub_class;
    if (params.interval_flag !== null) myObject.interval_flag = params.interval_flag;
    if (params.counter_tab_name !== null) myObject.counter_tab_name = params.counter_tab_name;

    const newSchema = await this.tableModel.save(myObject);

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "update";
    olog.object_type = "schema";
    olog.object_id = newSchema.id;
    this.ologModel.save(olog);

    return newSchema;
  }

  async delete(params: TadRtKpiSchema) {
    const myObject = await this.tableModel.find({id: params.id});

    let olog = new TadKpiOlog();
    olog.user_name = "KKK";
    olog.event_time = moment().format("yyyy-MM-DD HH:mm:ss");
    olog.operation = "delete";
    olog.object_type = "schema";
    olog.object_id = params.id;
    this.ologModel.save(olog);

    let myKpi = new TadRtKpi()
    myKpi.sid = params.id;
    this.tadKpiService.delete(myKpi);

    let myCounter = new TadRtKpiCounter()
    myCounter.sid = params.id;
    this.tadKpiCounterService.delete(myCounter);

    return await this.tableModel.remove(myObject);
  }
}
