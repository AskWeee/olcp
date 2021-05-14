import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { TadDbConnectionInfo } from '../../entity/TadDbConnectionInfo';
import { Repository } from 'typeorm';

@Provide()
export class TadDbConnectionInfoService {
  @InjectEntityModel(TadDbConnectionInfo)
  tadDbConnectionInfoModel: Repository<TadDbConnectionInfo>;

  // find
  async findAll() {
    // find All
    let myResult = await this.tadDbConnectionInfoModel.find();
    console.log("All connections from the db: ", myResult)

    // // find first
    // let firstPhoto = await this.tadDbConnectionInfoModel.findOne(1);
    // console.log("First photo from the db: ", firstPhoto);
    //
    // // find one by name
    // let meAndBearsPhoto = await this.tadDbConnectionInfoModel.findOne({ name: "Me and Bears" });
    // console.log("Me and Bears photo from the db: ", meAndBearsPhoto);
    //
    // // find by views
    // let allViewedPhotos = await this.tadDbConnectionInfoModel.find({ views: 1 });
    // console.log("All viewed photos: ", allViewedPhotos);
    //
    // let allPublishedPhotos = await this.tadDbConnectionInfoModel.find({ isPublished: true });
    // console.log("All published photos: ", allPublishedPhotos);
    //
    // // find and get count
    // let [allPhotos, photosCount] = await this.tadDbConnectionInfoModel.findAndCount();
    // console.log("All photos: ", allPhotos);
    // console.log("Photos count: ", photosCount);
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tadDbConnectionInfoModel.findOne({connection_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  // save
  async save() {
    // create a entity object
    let myObject = new TadDbConnectionInfo();
    myObject.db_host = "localhost";
    myObject.db_port = "3306";
    myObject.db_sid = "olcdb";
    myObject.db_username = "root";
    myObject.db_password = "root123";
    myObject.connection_name = "公司MySQL";

    // save entity
    const myResult = await this.tadDbConnectionInfoModel.save(myObject);

    // save success
    console.log('my object id = ', myResult.connection_id);
  }

  async test() {

  }
}
