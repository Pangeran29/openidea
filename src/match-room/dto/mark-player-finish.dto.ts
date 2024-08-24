import { IsBoolean, IsOptional } from 'class-validator';
import { MatchRoom } from '../entities/match-room.entity';

export class MarkPlayerFinishDto {
  @IsOptional()
  @IsBoolean()
  isPlayer1Finish: boolean;

  @IsOptional()
  @IsBoolean()
  isPlayer2Finish: boolean;

  intoMatchRoom(matchRoom: MatchRoom): MatchRoom {
    matchRoom.isPlayer1Finish = this.isPlayer1Finish;
    matchRoom.isPlayer2Finish = this.isPlayer2Finish;
    return matchRoom;
  }
}
