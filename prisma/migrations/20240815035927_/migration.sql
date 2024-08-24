-- CreateTable
CREATE TABLE "ItemVault" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfItem" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemVault_id_key" ON "ItemVault"("id");
