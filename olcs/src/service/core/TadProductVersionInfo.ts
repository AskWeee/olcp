import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductVersionInfo} from "../../entity/core/TadProductVersionInfo";

@Provide()
export class TadProductVersionInfoService {
  @InjectEntityModel(TadProductVersionInfo)
  tableModel: Repository<TadProductVersionInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({version_id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(name: string, desc: string, product_id: number) {
    let myObject = new TadProductVersionInfo();

    myObject.version_name = name;
    myObject.version_desc = desc;
    myObject.product_id = product_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(id: number, name: string, desc: string, product_id: number) {
    let myObject = await this.tableModel.findOne(id);

    myObject.version_name = name;
    myObject.version_desc = desc;
    myObject.product_id = product_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('update result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myObject = await this.tableModel.findOne(id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('delete result = ', myResult);
    return myResult;
  }
}
