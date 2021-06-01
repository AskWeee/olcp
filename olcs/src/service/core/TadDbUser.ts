import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadDbUser} from "../../entity/TadDbUser";

@Provide()
export class TadDbUserService {
  @InjectEntityModel(TadDbUser)
  tableModel: Repository<TadDbUser>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult)
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({user_id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(name: string, desc: string, product_line_id: number) {
    let myObject = new TadDbUser();

    myObject.user_name = name;
    myObject.user_desc = desc;
    myObject.product_line_id = product_line_id;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result = ', myResult);
    return myResult;
  }

  async update(id: number, name: string, desc: string, product_line_id: number) {
    let myObject = await this.tableModel.findOne(id);

    myObject.user_name = name;
    myObject.user_desc = desc;
    myObject.product_line_id = product_line_id;

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
