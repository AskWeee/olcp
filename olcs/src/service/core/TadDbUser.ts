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
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({user_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save() {
    let myObject = new TadDbUser();
    myObject.product_line_id = 1;
    myObject.user_name = "nrmdb";
    myObject.user_desc = "nrmdb";

    const myResult = await this.tableModel.save(myObject);

    console.log('my object id = ', myResult.user_id);
  }

  async test() {

  }
}
