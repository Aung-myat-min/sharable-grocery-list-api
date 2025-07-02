export class ResponseModel<T> {
  status: OperationStatus;
  message: string;
  data?: T;

  private constructor(status: OperationStatus, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(data?: T, message = "Success"): ResponseModel<T> {
    return new ResponseModel(OperationStatus.Success, message, data);
  }

  static fail<T>(message = "Failed", data?: T): ResponseModel<T> {
    return new ResponseModel(OperationStatus.Fail, message, data);
  }

  static notFound<T>(message = "Not Found"): ResponseModel<T> {
    return new ResponseModel(OperationStatus.NotFound, message);
  }

  static error<T>(message = "Server Error"): ResponseModel<T> {
    return new ResponseModel(OperationStatus.ServerError, message);
  }

  static empty<T>(): ResponseModel<T> {
    return new ResponseModel(OperationStatus.NotSpecified, "");
  }
}

export enum OperationStatus {
  NotSpecified = "NotSpecified",
  Success = "Success",
  NotFound = "NotFound",
  Fail = "Fail",
  ServerError = "ServerError",
}
