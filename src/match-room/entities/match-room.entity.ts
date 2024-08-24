import { MatchRoom as IMatchRoom } from "@prisma/client";

export class MatchRoom implements IMatchRoom {
    isPlayer1Ready: boolean;
    isPlayer1Finish: boolean;
    isPlayer2Ready: boolean;
    isPlayer2Finish: boolean;
    id: number;
    player1Id: number;
    player2Id: number;
    player1Offer: number;
    player2Offer: number;
    gamesChessComId: number;
    winnerId: number;
    typeOfGame: string;
    createdAt: Date;
    updatedAt: Date;
}
