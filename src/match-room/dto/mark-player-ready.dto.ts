import { IsBoolean, IsOptional } from 'class-validator';
import { MatchRoom } from '../entities/match-room.entity';

export class MarkPlayerReadyDto {
  @IsOptional()
  @IsBoolean()
  isPlayer1Ready: boolean;

  @IsOptional()
  @IsBoolean()
  isPlayer2Ready: boolean;

  intoMatchRoom(matchRoom: MatchRoom): MatchRoom {
    matchRoom.isPlayer1Ready = this.isPlayer1Ready;
    matchRoom.isPlayer2Ready = this.isPlayer2Ready;
    return matchRoom;
  }
}
