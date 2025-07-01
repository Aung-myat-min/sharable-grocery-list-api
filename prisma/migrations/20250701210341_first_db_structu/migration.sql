-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Rejected', 'Accepted');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userProfile" BYTEA NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Grocery" (
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Grocery_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "GroceryList" (
    "listId" TEXT NOT NULL,
    "listName" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "GroceryList_pkey" PRIMARY KEY ("listId")
);

-- CreateTable
CREATE TABLE "Request" (
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "requestById" TEXT NOT NULL,
    "requestedToId" TEXT NOT NULL,
    "requestListId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("requestId")
);

-- CreateTable
CREATE TABLE "_GroceryToGroceryList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroceryToGroceryList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ListOwners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ListOwners_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE INDEX "_GroceryToGroceryList_B_index" ON "_GroceryToGroceryList"("B");

-- CreateIndex
CREATE INDEX "_ListOwners_B_index" ON "_ListOwners"("B");

-- AddForeignKey
ALTER TABLE "Grocery" ADD CONSTRAINT "Grocery_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grocery" ADD CONSTRAINT "Grocery_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requestById_fkey" FOREIGN KEY ("requestById") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requestedToId_fkey" FOREIGN KEY ("requestedToId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requestListId_fkey" FOREIGN KEY ("requestListId") REFERENCES "GroceryList"("listId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroceryToGroceryList" ADD CONSTRAINT "_GroceryToGroceryList_A_fkey" FOREIGN KEY ("A") REFERENCES "Grocery"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroceryToGroceryList" ADD CONSTRAINT "_GroceryToGroceryList_B_fkey" FOREIGN KEY ("B") REFERENCES "GroceryList"("listId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListOwners" ADD CONSTRAINT "_ListOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "GroceryList"("listId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListOwners" ADD CONSTRAINT "_ListOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
