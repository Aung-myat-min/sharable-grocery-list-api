import { ResponseModel } from "./response.model";

export function ErrorMessageAssign<T>(
  response: ResponseModel<T>,
  error: unknown
): ResponseModel<T> {
  if (error instanceof Error) {
    response = ResponseModel.error<T>(error.message);
  } else {
    response = ResponseModel.error<T>("Unknown Error");
  }
  return response;
}
