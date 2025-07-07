import { TweakRequestStatus } from "@/controllers/request.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

export async function PATCH(req: Request) {
  const { requestId, status } = await req.json();

  let s;
  if (!requestId || status) {
    s = ResponseModel.invalid(null, "Required Id and Status are missing!");
  } else {
    s = await TweakRequestStatus(requestId, status);
  }

  return ResponseModelHandler(s);
}
