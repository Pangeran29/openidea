import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MatchRoom } from '../entities/match-room.entity';
import { TypeOfGame } from '../enum/type-of-game.enum';

export class CreateMatchRoomDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(TypeOfGame)
  typeOfGame: string;

  intoMatchRoom(): MatchRoom {
    const matchRoom = new MatchRoom();
    matchRoom.typeOfGame = this.typeOfGame;
    return matchRoom;
  }
}
