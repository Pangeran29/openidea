import { IsOptional } from 'class-validator';
import { MatchRoom } from '../entities/match-room.entity';

export class SetOpponentDto {
  @IsOptional()
  player2Id?: number;

  intoMatchRoom(matchRoom: MatchRoom): MatchRoom {
    matchRoom.player2Id = this.player2Id;
    return matchRoom;
  }
}
