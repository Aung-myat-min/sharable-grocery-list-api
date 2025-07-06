import { GroceryList } from "@/app/generated/prisma";
import {
  CreateGroceryList,
  GetGroceryListByUserId,
} from "@/controllers/grocerylist.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

// Get Grocery Lists by User Id
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") as string;

  const status = await GetGroceryListByUserId(userId);

  return ResponseModelHandler(status);
}

// Create New Grocery List
export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const newGroceryList = (await req.json()) as GroceryList | undefined;

  let status;
  if (!newGroceryList) {
    status = ResponseModel.invalid<null>(
      null,
      "New Grocery List can't be null!"
    );
  } else {
    status = await CreateGroceryList(newGroceryList, userId);
  }

  return ResponseModelHandler(status);
}
