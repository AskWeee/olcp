import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {Repository} from 'typeorm';
import {TadProjectKpi} from "../../entity/service/TadProjectKpi";

@Provide()
export class TadProjectKpiService {
  @InjectEntityModel(TadProjectKpi)
  tableModel: Repository<TadProjectKpi>;

  async findAll() {
    return await this.tableModel.find();
  }

  async find(params: TadProjectKpi) {
    return await this.tableModel.find({
      where: {
        id: params.id
      }
    });
  }

  async save(params: TadProjectKpi) {
    return await this.tableModel.save(params);
  }

  async update(params: TadProjectKpi) {
    let myObject;

    if (params.id) {
      myObject = await this.tableModel.findOne({
        id: params.id
      });

      if (params.kpi_ui_title !== null) {
        if (params.kpi_ui_title.trim() === "") {
          myObject.kpi_ui_title = null;
        } else {
          myObject.kpi_ui_title = params.kpi_ui_title;
        }
      }

      return await this.tableModel.save(myObject);
    }
  }

  async delete(params: TadProjectKpi) {
    let myObject;

    if (params.id) {
      myObject = await this.tableModel.find({
        id: params.id
      });

      return await this.tableModel.remove(myObject);
    }
  }
}
