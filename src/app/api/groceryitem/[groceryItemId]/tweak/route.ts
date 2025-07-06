import { TweakItemState } from "@/controllers/grocery.controller";
import { ResponseModelHandler } from "@/utils/response.handler";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ groceryItemId: string }> }
) {
  const itemId = (await params).groceryItemId;
  const userId = (await req.headers.get("x-user-id")) as string;
  const { bought } = await req.json();

  const status = await TweakItemState(itemId, bought, userId);

  return ResponseModelHandler(status);
}
