import { CreateRequest } from "@/controllers/request.controller";
import { ResponseModelHandler } from "@/utils/response.handler";

export async function PATCH(req: Request) {
  const { requestEmail, receiveEmail, requestListId, message } =
    await req.json();

  const status = await CreateRequest(
    requestEmail,
    receiveEmail,
    requestListId,
    message
  );

  return ResponseModelHandler(status);
}
