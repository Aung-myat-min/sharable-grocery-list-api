import { Grocery, PrismaClient } from "@/app/generated/prisma";
import { ResponseModel } from "@/utils/response.model";
import { ErrorMessageAssign } from "@/utils/error.assign";
import { OperationStatus } from "@/utils/response.model";

const prisma = new PrismaClient();

// Create Grocery Item
export async function CreateGroceryItem(
  newGroceryItem: Grocery,
  listId: string
): Promise<ResponseModel<Grocery>> {
  let response = ResponseModel.empty<Grocery>();

  try {
    const nGrocery = await prisma.grocery.create({
      data: newGroceryItem,
    });

    const added = await AddItemToList(nGrocery.itemId, listId);

    if (added.status !== OperationStatus.Success) {
      return added;
    }

    response = ResponseModel.success(nGrocery, "New Grocery Item Created!");
  } catch (error) {
    console.error(`Error Creating Grocery Item: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Add Grocery Item to a List
export async function AddItemToList(
  itemId: string,
  listId: string
): Promise<ResponseModel<Grocery>> {
  let response = ResponseModel.empty<Grocery>();

  try {
    const updated = await prisma.grocery.update({
      where: { itemId },
      data: {
        groceryLists: {
          connect: { listId },
        },
      },
    });

    response = ResponseModel.success(updated, "Grocery Item added to List!");
  } catch (error) {
    console.error(`Error Adding Grocery Item to List: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Update Grocery Item by Id
export async function UpdateGroceryItemById(
  itemId: string,
  userId?: string,
  itemName?: string,
  categoryName?: string,
  note?: string
): Promise<ResponseModel<Grocery>> {
  let response = ResponseModel.empty<Grocery>();

  try {
    const updated = await prisma.grocery.update({
      where: { itemId },
      data: {
        itemName,
        categoryName,
        note,
        updatedById: userId,
      },
    });

    response = ResponseModel.success(updated, "Grocery Item Updated!");
  } catch (error) {
    console.error(`Error Updating Grocery Item: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Tweak Item State
export async function TweakItemState(
  itemId: string,
  bought: boolean,
  userId?: string
): Promise<ResponseModel<Grocery>> {
  let response = ResponseModel.empty<Grocery>();

  try {
    const updated = await prisma.grocery.update({
      where: { itemId },
      data: {
        bought,
        updatedById: userId,
      },
    });

    response = ResponseModel.success(updated, "Grocery Item Status Updated!");
  } catch (error) {
    console.error(`Error Updating Grocery Item Status: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Delete Grocery Item by Id
export async function DeleteItemById(
  itemId: string
): Promise<ResponseModel<Grocery>> {
  let response = ResponseModel.empty<Grocery>();

  try {
    const updated = await prisma.grocery.delete({
      where: { itemId },
    });

    response = ResponseModel.success(updated, "Grocery Item Deleted!");
  } catch (error) {
    console.error(`Error Deleting Grocery Item: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}
