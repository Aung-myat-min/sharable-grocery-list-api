import { NextResponse } from "next/server";
import { ResponseModel, OperationStatus } from "./response.model";

export function ResponseModelHandler<T>(model: ResponseModel<T>) {
  const statusMap: Record<OperationStatus, number> = {
    [OperationStatus.Success]: 200,
    [OperationStatus.NotFound]: 404,
    [OperationStatus.Invalid]: 401,
    [OperationStatus.Fail]: 400,
    [OperationStatus.ServerError]: 500,
    [OperationStatus.NotSpecified]: 520,
  };

  const statusCode = statusMap[model.status] ?? 520;
  return NextResponse.json(model, { status: statusCode });
}
