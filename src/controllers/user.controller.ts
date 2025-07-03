import { User } from "@/app/generated/prisma";
import { ErrorMessageAssign } from "@/utils/error.assign";
import { ResponseModel } from "@/utils/response.model";
import { PrismaClient } from "@/app/generated/prisma/index";

const prisma = new PrismaClient();

// Create User (This func will properly be only used on sign up process)
export async function CreateUser(newUser: User): Promise<ResponseModel<User>> {
  let response = ResponseModel.empty<User>();

  try {
    const nUser = await prisma.user.create({ data: newUser });

    response = ResponseModel.success<User>(nUser, "New User Created!");
  } catch (error) {
    console.error(`Error Creating User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Get User (This func will properly be only used on sign up process)
export async function GetUser(userId: string): Promise<ResponseModel<User>> {
  let response = ResponseModel.empty<User>();

  try {
    const nUser = await prisma.user.findUnique({ where: { userId: userId } });

    if (nUser) {
      response = ResponseModel.success<User>(nUser, "User Found!");
    } else {
      response = ResponseModel.notFound<User>("User Not Found!");
    }
  } catch (error) {
    console.error(`Error Creating User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Check Email is already used or not
export async function CheckEmail(
  userEmail: string
): Promise<ResponseModel<boolean>> {
  let response = ResponseModel.empty<boolean>();

  try {
    const nUser = await prisma.user.findUnique({ where: { userEmail } });

    if (nUser) {
      response = ResponseModel.success<boolean>(true, "Email Already In Use!");
    } else {
      response = ResponseModel.notFound<boolean>("Email is new!");
    }
  } catch (error) {
    console.error(`Error Creating User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

/*
  I personally divied the update functions into three functions. And here is why:

  1. UpdateUser - for anything unimportant
  2. UpdateUserEmail - for just updating user email
  3. UpdateUserProfile - for just updating user profile (to make the function as fast as possible)
*/

// Update User
export async function UpdateUser(
  userId: string,
  userName: string
): Promise<ResponseModel<User>> {
  let response = ResponseModel.empty<User>();

  try {
    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: {
        userName: userName,
      },
    });

    response = ResponseModel.success<User>(
      updatedUser,
      "User has been updated!"
    );
  } catch (error) {
    console.error(`Error Updating User: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Update User Email
export async function UpdateUserEmail(
  userId: string,
  userEmail: string
): Promise<ResponseModel<User>> {
  let response = ResponseModel.empty<User>();

  try {
    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: {
        userEmail: userEmail,
      },
    });

    response = ResponseModel.success<User>(
      updatedUser,
      "User has been updated!"
    );
  } catch (error) {
    console.error(`Error Updating User Email: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}

// Update User Profile
export async function UpdateUserProfile(
  userId: string,
  userProfile: Uint8Array<ArrayBufferLike>
): Promise<ResponseModel<User>> {
  let response = ResponseModel.empty<User>();

  try {
    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: {
        userProfile: userProfile,
      },
    });

    response = ResponseModel.success<User>(
      updatedUser,
      "User has been updated!"
    );
  } catch (error) {
    console.error(`Error Updating User Profile: ${error}`);
    response = ErrorMessageAssign(response, error);
  }

  return response;
}
