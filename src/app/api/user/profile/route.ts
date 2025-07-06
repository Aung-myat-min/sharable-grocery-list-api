import { UpdateUserProfile } from "@/controllers/user.controller";
import { imageFileToUint8 } from "@/utils/imagetouint8";
import { ResponseModelHandler } from "@/utils/response.handler";
import { ResponseModel } from "@/utils/response.model";

export async function PATCH(req: Request) {
  const userId = req.headers.get("x-user-id") as string;

  const formData = await req.formData();
  const imageFile = formData.get("image") as File | null;
  const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  let status;
  if (imageFile == null || !validTypes.includes(imageFile.type)) {
    status = ResponseModel.invalid<null>(null, "Invalid image format!");
  } else {
    const bufferedImg = await imageFileToUint8(imageFile);
    status = await UpdateUserProfile(userId, bufferedImg);
  }

  return ResponseModelHandler(status);
}
