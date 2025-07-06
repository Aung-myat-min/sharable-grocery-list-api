import {
  DeleteGroceryListById,
  GetGroceryListById,
  UpdateGroceryListById,
} from "@/controllers/grocerylist.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

// Get Grocery List by Id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ groceryListId: string }> }
) {
  const status = await GetGroceryListById((await params).groceryListId);
  return ResponseModelHandler(status);
}

// Update Grocery List by Id
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ groceryListId: string }> }
) {
  const id = (await params).groceryListId;
  const { listName, order } = await req.json();

  let status;
  if (
    typeof listName == "string" &&
    listName.length > 2 &&
    typeof order == "number" &&
    order > 0
  ) {
    status = await UpdateGroceryListById(id, listName, order);
  } else {
    status = ResponseModel.invalid<null>(
      null,
      "Invalid List Name or Order No!"
    );
  }

  return ResponseModelHandler(status);
}

// Delete Grocery List By Id
export async function DELTE(
  req: Request,
  { params }: { params: Promise<{ groceryListId: string }> }
) {
  const id = (await params).groceryListId;

  const status = await DeleteGroceryListById(id);

  return ResponseModelHandler(status);
}
