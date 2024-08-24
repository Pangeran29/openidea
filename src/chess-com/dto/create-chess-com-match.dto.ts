import { IsEnum, IsOptional } from 'class-validator';
import { ChessCom } from '../entities/chess-com.entity';
import { DurationPlay } from '../enum/duration.enum';

export class ChessComMatchDto {
  @IsOptional()
  player1Username?: string;

  @IsOptional()
  player2Username?: string;

  @IsOptional()
  @IsEnum(DurationPlay)
  durationOfPlay?: number;

  intoChessCom(): ChessCom {
    const chessCom = new ChessCom();
    chessCom.player1Username = this.player1Username;
    chessCom.player2Username = this.player2Username;
    chessCom.durationOfPlay = this.durationOfPlay;
    return chessCom;
  }
}
