import { NextApiResponse } from "next";
import { ResponseModel, OperationStatus } from "./response.model";

export function ResponseModelHandler<T>(res: NextApiResponse, model: ResponseModel<T>) {
  let statusCode: number;

  switch (model.status) {
    case OperationStatus.Success:
      statusCode = 200;
      break;
    case OperationStatus.NotFound:
      statusCode = 404;
      break;
    case OperationStatus.Fail:
      statusCode = 400;
      break;
    case OperationStatus.ServerError:
      statusCode = 500;
      break;
    default:
      statusCode = 520; // NotSpecified
  }

  return res.status(statusCode).json(model);
}
