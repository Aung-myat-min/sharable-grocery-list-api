import { TweakRequestStatus } from "@/controllers/request.controller";
import { ResponseModelHandler } from "@/utils/response.handler";

export async function PATCH(req: Request) {
  const { requestId, status } = await req.json();

  const s = await TweakRequestStatus(requestId, status);

  return ResponseModelHandler(s);
}
