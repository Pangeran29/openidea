import { ChessCom as IChessCom, Prisma } from "@prisma/client";

export class ChessCom implements IChessCom {
  player1GameHistoryUri: string;
  player1RelatedGameIndex: number;
  player2GameHistoryUri: string;
  player2RelatedGameIndex: number;
  id: number;
  player1Username: string;
  player2Username: string;
  durationOfPlay: number;
  detailMatch: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}
