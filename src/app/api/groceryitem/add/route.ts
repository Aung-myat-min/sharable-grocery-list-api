import { AddItemToList } from "@/controllers/grocery.controller";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

// Add Item to List or Change the List of an Item
export async function POST(req: Request) {
  const { listId, itemId } = await req.json();
  let status;

  if (listId == null || itemId == null) {
    status = ResponseModel.invalid<null>(null, "List Id or Item Id is null!");
  } else {
    status = await AddItemToList(itemId, listId);
  }

  return ResponseModelHandler(status);
}
