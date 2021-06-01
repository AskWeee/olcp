import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadDict} from "../../entity/TadDict";

@Provide()
export class TadDictService {
  @InjectEntityModel(TadDict)
  tableModel: Repository<TadDict>;

  async findAll() {
    let myResult = await this.tableModel.find();

    console.log("findAll result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({id: id});

    console.log("find result = ", myResult);
    return myResult;
  }

  async save(type: string, name: string, desc: string) {
    let myObject = new TadDict();
    myObject.type = type;
    myObject.name = name;
    myObject.desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('save result', myResult);
    return myResult;
  }

  async update(id: number, type: string, name: string, desc: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.type = type;
    myObject.name = name;
    myObject.desc = desc;

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
