import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChessComService } from './chess-com.service';
import { ApiTags } from '@nestjs/swagger';
import { ChessComMatchDto } from './dto/create-chess-com-match.dto';
import { MatchRoomService } from 'src/match-room/match-room.service';
import { TypeOfGame } from 'src/match-room/enum/type-of-game.enum';

@ApiTags('chess-com')
@Controller('chess-com')
export class ChessComController {
  constructor(
    private readonly chessComService: ChessComService,
    private readonly matchRoomService: MatchRoomService,
  ) {}

  @Post('create-new-game/:match_room_id')
  async createNewGame(
    @Param('match_room_id') matchRoomId: number,
    @Body() chessComMatchDto: ChessComMatchDto,
  ) {
    const matchRoom = await this.matchRoomService.findById(matchRoomId);
    if (matchRoom.typeOfGame != TypeOfGame.ChessCom) {
      throw new BadRequestException('Room and type of game not match');
    }

    let chessCom = chessComMatchDto.intoChessCom();

    {
      // validate user1
      if (chessComMatchDto.player1Username) {
        const { player1Username } = chessComMatchDto;
        const history =
          await this.chessComService.getRelatedGameIndex(player1Username);
        chessCom.player1GameHistoryUri = history.url;
        chessCom.player1RelatedGameIndex = history.index;
      }

      // validate user2
      if (chessComMatchDto.player2Username) {
        const { player2Username } = chessComMatchDto;
        const history =
          await this.chessComService.getRelatedGameIndex(player2Username);
        chessCom.player2GameHistoryUri = history.url;
        chessCom.player2RelatedGameIndex = history.index;
      }
    }

    if (matchRoom.gamesChessComId) {
      chessCom.id = matchRoom.gamesChessComId;
    } else {
      chessCom.id = 0;
    }
    
    chessCom = await this.chessComService.upsert(chessCom);

    matchRoom.gamesChessComId = chessCom.id;
    await this.matchRoomService.update(matchRoom);

    return chessCom;
  }

  @Get('profile/:username_chess_com')
  async getProfile(@Param('username_chess_com') username: string) {
    return await this.chessComService.findUsername(username);
  }

  @Get('validate-match/:username_chess_com1/:username_chess_com2')
  async validateMatch(
    @Param('username_chess_com1') username1: string,
    @Param('username_chess_com2') username2: string,
  ) {
    const matchPlayer1 = await this.chessComService.getLatestMatch(username1);
    const matchPlayer2 = await this.chessComService.getLatestMatch(username2);

    this.chessComService.validateMatch(matchPlayer1, matchPlayer2);

    const winner = await this.chessComService.getWinnerUsername(matchPlayer1);

    return {
      is_valid: true,
      winnerUsername: winner,
      white: matchPlayer1.white,
      black: matchPlayer1.black,
    };

    // substract the point from loser and transfer some to winner and platform
  }
}
