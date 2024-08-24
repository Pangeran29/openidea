/*
  Warnings:

  - You are about to drop the column `approval_code` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `card_type` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `channel_response_code` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `channel_response_message` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `detail_item` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_time` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `fraud_status` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `gross_amount` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `masked_card` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_id` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `settlement_time` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `signature_key` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `status_code` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `status_message` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `three_ds_version` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_status` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_time` on the `TransactionHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `TransactionHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemVaultId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "approval_code",
DROP COLUMN "card_type",
DROP COLUMN "channel_response_code",
DROP COLUMN "channel_response_message",
DROP COLUMN "detail_item",
DROP COLUMN "expiry_time",
DROP COLUMN "fraud_status",
DROP COLUMN "gross_amount",
DROP COLUMN "masked_card",
DROP COLUMN "merchant_id",
DROP COLUMN "order_id",
DROP COLUMN "payment_type",
DROP COLUMN "settlement_time",
DROP COLUMN "signature_key",
DROP COLUMN "status_code",
DROP COLUMN "status_message",
DROP COLUMN "three_ds_version",
DROP COLUMN "transaction_id",
DROP COLUMN "transaction_status",
DROP COLUMN "transaction_time",
ADD COLUMN     "approvalCode" TEXT,
ADD COLUMN     "cardType" TEXT,
ADD COLUMN     "channelResponseCode" TEXT,
ADD COLUMN     "channelResponseMessage" TEXT,
ADD COLUMN     "detailItem" TEXT,
ADD COLUMN     "expiryTime" TEXT,
ADD COLUMN     "fraudStatus" TEXT,
ADD COLUMN     "grossAmount" TEXT,
ADD COLUMN     "itemVaultId" INTEGER NOT NULL,
ADD COLUMN     "maskedCard" TEXT,
ADD COLUMN     "merchantId" TEXT,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "paymentType" TEXT,
ADD COLUMN     "settlementTime" TEXT,
ADD COLUMN     "signatureKey" TEXT,
ADD COLUMN     "statusCode" TEXT,
ADD COLUMN     "statusMessage" TEXT,
ADD COLUMN     "three_dsVersion" TEXT,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "transactionStatus" TEXT,
ADD COLUMN     "transactionTime" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionHistory_orderId_key" ON "TransactionHistory"("orderId");

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_itemVaultId_fkey" FOREIGN KEY ("itemVaultId") REFERENCES "ItemVault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
