import { UpdateUserEmail } from "@/controllers/user.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

export async function PATCH(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const { userEmail } = await req.json();
  let status;
  if (typeof userEmail == "string" || userEmail.length == 2) {
    status = ResponseModel.invalid<null>(null, "Invalid Email!");
  } else {
    status = await UpdateUserEmail(userId, userEmail);
  }

  return ResponseModelHandler(status);
}
