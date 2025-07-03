import { GroceryList, PrismaClient } from "@/app/generated/prisma/index";
import { ResponseModel } from "@/utils/response.model";
import { ErrorMessageAssign } from "@/utils/error.assign";

const prisma = new PrismaClient();

// Create new Grocery List
export async function CreateGroceryList(
  newGroceryList: GroceryList
): Promise<ResponseModel<GroceryList>> {
  let response = ResponseModel.empty<GroceryList>();

  try {
    const nGroceryList = await prisma.groceryList.create({
      data: newGroceryList,
    });

    response = ResponseModel.success<GroceryList>(
      nGroceryList,
      "New GroceryList Created!"
    );
  } catch (error) {
    console.error(`Error Creating GroceryList: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Get one GroceryList
export async function GetGroceryListById(
  listId: string
): Promise<ResponseModel<GroceryList>> {
  let response = ResponseModel.empty<GroceryList>();

  try {
    const groceryList = await prisma.groceryList.findUnique({
      where: { listId: listId, isDeleted: false },
      include: { items: true, owners: { select: { userName: true } } },
    });

    if (groceryList) {
      response = ResponseModel.success<GroceryList>(
        groceryList,
        "Grocery List Found!"
      );
    } else {
      response = ResponseModel.notFound<GroceryList>("Grocery List Not Found!");
    }
  } catch (error) {
    console.error(`Error Getting Grocery List by Id: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Get GroceryList by UserId
export async function GetGroceryListByUserId(
  userId: string
): Promise<ResponseModel<GroceryList[]>> {
  let response = ResponseModel.empty<GroceryList[]>();

  try {
    const groceryList = await prisma.groceryList.findMany({
      where: { isDeleted: false, owners: { some: { userId: userId } } },
      include: {
        items: true,
        owners: { select: { userName: true } },
      },
    });

    if (groceryList.length > 0) {
      response = ResponseModel.success<GroceryList[]>(
        groceryList,
        "Here are the Grocery Lists for the user!"
      );
    } else {
      response = ResponseModel.notFound<GroceryList[]>(
        "User has no grocery list!"
      );
    }
  } catch (error) {
    console.error(`Error Getting Lists of Grocery Lists By User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Update one GroceryList (update list name and order)
export async function UpdateGroceryListById(
  listId: string,
  listName: string,
  order: number
): Promise<ResponseModel<GroceryList>> {
  let response = ResponseModel.empty<GroceryList>();

  try {
    const groceryList = await prisma.groceryList.update({
      where: { listId: listId, isDeleted: false },
      data: { listName, order },
    });

    if (groceryList) {
      response = ResponseModel.success<GroceryList>(
        groceryList,
        "Grocery List Updated!"
      );
    } else {
      response = ResponseModel.notFound<GroceryList>("Grocery List Not Found!");
    }
  } catch (error) {
    console.error(`Error Updating User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Add User to the List Owner
export async function AddUserToList(
  listId: string,
  userId: string
): Promise<ResponseModel<null>> {
  let response = ResponseModel.empty<null>();

  try {
    const groceryList = await prisma.groceryList.update({
      where: { listId: listId, isDeleted: false },
      data: {
        owners: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    if (groceryList) {
      response = ResponseModel.success<null>(
        null,
        "Added User to the Grocery List!"
      );
    } else {
      response = ResponseModel.notFound<null>("Grocery List Not Found!");
    }
  } catch (error) {
    console.error(`Error Adding User to GroceryList: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Remove User from the List Owner
export async function RemoveUserFromList(
  listId: string,
  userId: string
): Promise<ResponseModel<null>> {
  let response = ResponseModel.empty<null>();

  try {
    const groceryList = await prisma.groceryList.update({
      where: { listId: listId, isDeleted: false },
      data: {
        owners: {
          disconnect: {
            userId: userId,
          },
        },
      },
    });

    if (groceryList) {
      response = ResponseModel.success<null>(
        null,
        "Removed User from the Grocery List!"
      );
    } else {
      response = ResponseModel.notFound<null>("Grocery List Not Found!");
    }
  } catch (error) {
    console.error(`Error Removing User from GroceryList: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Delete List
export async function DeleteGroceryListById(
  listId: string
): Promise<ResponseModel<null>> {
  let response = ResponseModel.empty<null>();

  try {
    const groceryList = await prisma.groceryList.update({
      where: { listId: listId, isDeleted: false },
      data: { isDeleted: true },
    });

    if (groceryList) {
      response = ResponseModel.success<null>(null, "Grocery List Deleted!");
    } else {
      response = ResponseModel.notFound<null>("Grocery List Not Found!");
    }
  } catch (error) {
    console.error(`Error Deleting GroceryList: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}
