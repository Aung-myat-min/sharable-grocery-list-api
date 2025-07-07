import { GetRequestByUser } from "@/controllers/request.controller";
import { ResponseModelHandler } from "@/utils/response.handler";

// Get Pending Requests by User Id
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") as string;

  const status = await GetRequestByUser(userId);

  return ResponseModelHandler(status);
}
