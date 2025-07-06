import { GetUser, UpdateUser } from "@/controllers/user.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") as string;

  const status = await GetUser(userId);

  return ResponseModelHandler(status);
}

export async function PATCH(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const { userName } = await req.json();
  let status;
  if (typeof userName == "string" || userName.length == 2) {
    status = ResponseModel.invalid<null>(
      null,
      "User Name must have at least 2 characters!"
    );
  } else {
    status = await UpdateUser(userId, userName);
  }

  return ResponseModelHandler(status);
}
