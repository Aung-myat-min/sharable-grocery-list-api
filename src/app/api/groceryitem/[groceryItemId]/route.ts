import { UpdateGroceryItemById } from "@/controllers/grocery.controller";
import { DeleteGroceryListById } from "@/controllers/grocerylist.controller";
import { ResponseModelHandler } from "@/utils/response.handler";

// Update Grocery List By Id
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ groceryItemId: string }> }
) {
  const itemId = (await params).groceryItemId;
  const userId = (await req.headers.get("x-user-id")) as string;

  const { itemName, categoryName, note } = await req.json();

  const status = await UpdateGroceryItemById(
    itemId,
    userId,
    itemName,
    categoryName,
    note
  );

  return ResponseModelHandler(status);
}

// Update Grocery List By Id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ groceryItemId: string }> }
) {
  const itemId = (await params).groceryItemId;

  const status = await DeleteGroceryListById(itemId);

  return ResponseModelHandler(status);
}
