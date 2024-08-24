-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalDiamond" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "MatchRoom" (
    "id" SERIAL NOT NULL,
    "player1Id" INTEGER NOT NULL,
    "player2Id" INTEGER,
    "typeOfGame" TEXT NOT NULL,
    "player1Offer" INTEGER,
    "player2Offer" INTEGER,
    "winnerId" INTEGER,
    "gamesChessComId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ChessCom" (
    "id" SERIAL NOT NULL,
    "player1Username" TEXT,
    "player2Username" TEXT,
    "durationOfPlay" INTEGER,
    "detailMatch" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "TransactionHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "detail_item" TEXT,
    "transaction_time" TEXT,
    "transaction_status" TEXT,
    "transaction_id" TEXT,
    "three_ds_version" TEXT,
    "status_message" TEXT,
    "status_code" TEXT,
    "signature_key" TEXT,
    "settlement_time" TEXT,
    "payment_type" TEXT,
    "order_id" TEXT,
    "metadata" JSONB,
    "merchant_id" TEXT,
    "masked_card" TEXT,
    "gross_amount" TEXT,
    "fraud_status" TEXT,
    "expiry_time" TEXT,
    "eci" TEXT,
    "currency" TEXT,
    "channel_response_message" TEXT,
    "channel_response_code" TEXT,
    "card_type" TEXT,
    "bank" TEXT,
    "approval_code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchRoom_id_key" ON "MatchRoom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChessCom_id_key" ON "ChessCom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionHistory_id_key" ON "TransactionHistory"("id");

-- AddForeignKey
ALTER TABLE "MatchRoom" ADD CONSTRAINT "MatchRoom_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRoom" ADD CONSTRAINT "MatchRoom_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRoom" ADD CONSTRAINT "MatchRoom_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRoom" ADD CONSTRAINT "MatchRoom_gamesChessComId_fkey" FOREIGN KEY ("gamesChessComId") REFERENCES "ChessCom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
