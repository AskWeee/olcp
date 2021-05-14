import {App, Configuration} from '@midwayjs/decorator';
import {ILifeCycle, IMidwayContainer} from '@midwayjs/core';
import {Application} from 'egg';
import {join} from 'path';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';

@Configuration({
  importConfigs: [
    join(__dirname, './config')
  ],
  conflictCheck: true,
  imports: [
    swagger,
    orm
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;


  //@Inject()
  //dbCore: DbCore;

  async onReady(container: IMidwayContainer): Promise<void> {
    //this.app.connection = "hello world";
    let message = "this.dbCore.connectionString";
    console.log(message);
    // this.dbCore = "dbCore.connect"; // .connect();

  }

  async onStop(): Promise<void> {
    // 关闭数据库连接
    // this.dbCore = "dbCore.close"; //.close();
  }
}
