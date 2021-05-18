export class RestResult {
  code: string;
  success: boolean;
  message: string;
  data: any

  constructor() {
    this.code = "200-000";
    this.success = true;
    this.message = "接口调用成功";
    this.data = []
  }
}
