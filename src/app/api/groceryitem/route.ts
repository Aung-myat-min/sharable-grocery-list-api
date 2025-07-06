import { CreateGroceryItem } from "@/controllers/grocery.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

// Create new Grocery Item
export async function POST(req: Request) {
  // const userId = await req.headers.get("x-user-id") as string;
  let status;

  const { listId, ...groceryItem } = await req.json();
  if (!groceryItem) {
    status = ResponseModel.invalid<null>(
      null,
      "New Grocery Item can't be null!"
    );
  } else {
    status = await CreateGroceryItem(groceryItem, listId);
  }

  return ResponseModelHandler(status);
}
