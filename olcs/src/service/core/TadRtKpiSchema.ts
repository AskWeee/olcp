import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {RestResult} from "../../controller/RestResult";
import {TadRtKpiSchema} from "../../entity/TadRtKpiSchema";

@Provide()
export class TadRtKpiSchemaService {
  @InjectEntityModel(TadRtKpiSchema)
  tableModel: Repository<TadRtKpiSchema>;

  async findAll() {
    let restResult = new RestResult();

    let myResult = await this.tableModel.find({
      order: {
        schema_zhname: "ASC",
      }
    });

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return restResult;
  }

  async find(params: TadRtKpiSchema) {
    let restResult = new RestResult();

    let myResult = await this.tableModel.find({id: params.id});

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async save(params: TadRtKpiSchema) {
    let restResult = new RestResult();

    const myResult = await this.tableModel.save(params);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async update(params: TadRtKpiSchema) {
    let restResult = new RestResult();

    let myObject = await this.tableModel.findOne(params.id);

    myObject.schema_id = params.schema_id;
    myObject.schema_ns = params.schema_ns;
    myObject.schema_zhname = params.schema_zhname;
    myObject.schema_enname = params.schema_enname;
    myObject.vendor_id = params.vendor_id;
    myObject.object_class = params.object_class;
    myObject.sub_class = params.sub_class;
    myObject.interval_flag = params.interval_flag;
    myObject.counter_tab_name = params.counter_tab_name;

    let myResult = await this.tableModel.save(myObject);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }

  async delete(params: TadRtKpiSchema) {
    let restResult = new RestResult();

    let myObject = await this.tableModel.find({id: params.id});
    let myResult = await this.tableModel.remove(myObject);

    restResult.success = true;
    restResult.data = myResult;
    restResult.message = "success";

    return myResult;
  }
}
