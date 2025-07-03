import { PrismaClient, Request, Status } from "@/app/generated/prisma";
import { ResponseModel } from "@/utils/response.model";
import { ErrorMessageAssign } from "@/utils/error.assign";
import { generateUniqueId } from "@/utils/generate-unique-id";

const prisma = new PrismaClient();

// Create Grocery Item
export async function CreateRequest(
  requestEmail: string,
  receiveEmail: string,
  requestListId: string,
  message?: string
): Promise<ResponseModel<Request>> {
  let response = ResponseModel.empty<Request>();

  try {
    const requestUserId = await prisma.user.findUnique({
      where: { userEmail: requestEmail },
      select: { userId: true },
    });
    const receiveUserId = await prisma.user.findUnique({
      where: { userEmail: receiveEmail },
      select: { userId: true },
    });

    if (!requestUserId || !receiveUserId) {
      response = ResponseModel.notFound(
        "Request User or Receive User Not Found!"
      );
    } else {
      const nRequest = await prisma.request.create({
        data: {
          requestId: generateUniqueId(),
          message,
          requestById: requestUserId.userId,
          requestedToId: receiveUserId.userId,
          requestListId,
        },
      });

      response = ResponseModel.success<Request>(
        nRequest,
        "New Request Created!"
      );
    }
  } catch (error) {
    console.error(`Error Creating New Request: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Get Requests by User Id
export async function GetRequestByUser(
  userId: string
): Promise<ResponseModel<Request[]>> {
  let response = ResponseModel.empty<Request[]>();

  try {
    const requests = await prisma.request.findMany({
      where: {
        OR: [{ requestById: userId }, { requestedToId: userId }],
        status: "Pending",
      },
    });

    response = ResponseModel.success<Request[]>(
      requests,
      "Here are the requests!"
    );
  } catch (error) {
    console.error(`Error Getting Requests by User Id: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Tweak Request Status
export async function TweakRequestStatus(
  requestId: string,
  status: Status
): Promise<ResponseModel<Request>> {
  let response = ResponseModel.empty<Request>();

  try {
    const requests = await prisma.request.update({
      where: { requestId },
      data: { status },
    });

    response = ResponseModel.success<Request>(
      requests,
      "Request Status Updated!"
    );
  } catch (error) {
    console.error(`Error Updating Request Status: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}
