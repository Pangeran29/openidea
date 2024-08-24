-- AlterTable
ALTER TABLE "MatchRoom" ADD COLUMN     "isPlayer1Finish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPlayer1Ready" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPlayer2Finish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPlayer2Ready" BOOLEAN NOT NULL DEFAULT false;
