import { CreateRequest } from "@/controllers/request.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { requestEmail, receiveEmail, requestListId, message } = body;

  let status;
  if (!requestEmail || !receiveEmail || !requestListId) {
    status = ResponseModel.invalid(null, "Missing required fields.");
  } else {
    status = await CreateRequest(
      requestEmail,
      receiveEmail,
      requestListId,
      message
    );
  }

  return ResponseModelHandler(status);
}
