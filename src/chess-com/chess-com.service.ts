import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProfileChessCom } from './type/profile-chess-com.type';
import { HistoryChessCom, MatchChessCom } from './type/history-chess-com.type';
import { PrismaException, PrismaService } from '@app/common';
import { ChessCom } from './entities/chess-com.entity';

@Injectable()
export class ChessComService {
  private readonly logger = new Logger(ChessComService.name);
  private readonly chessComUri: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.chessComUri = this.configService.get('CHESS_COM_BASE_URI');
  }

  async findUsername(username: string): Promise<ProfileChessCom> {
    let url = `${this.chessComUri}/pub/player/${username}`;
    let request = this.httpService.get(url);
    const { data } = await firstValueFrom(
      request.pipe(
        catchError((error: AxiosError) => {
          const errorJson = error.toJSON() as any;
          this.logger.error(errorJson);
          if (errorJson?.status == 404 || errorJson?.status == 410) {
            throw new NotFoundException({
              message: 'Username not found',
              chessComErr: error.response.data,
            });
          } else {
            throw new InternalServerErrorException({
              message: 'Chess.com error',
              chessComErr: error.response.data,
            });
          }
        }),
      ),
    );
    return data as ProfileChessCom;
  }

  async getLatestMatch(username: string): Promise<MatchChessCom> {
    const matchHistory = await this.getMatchHistory(username);
    return matchHistory.games.pop();
  }

  async getRelatedGameIndex(
    username: string,
  ): Promise<{ index: number; url: string }> {
    const matchHistory = await this.getMatchHistory(username);
    return { index: matchHistory.games.length + 1, url: matchHistory.url };
  }

  async getMatchHistory(
    username: string,
  ): Promise<{ url: string; games: MatchChessCom[] }> {
    const { year, month } = this._getMatchMonthAndYear();

    let url = `${this.chessComUri}/pub/player/${username}/games/${year}/${month}`;
    let request = this.httpService.get(url);
    const { data }: { data: HistoryChessCom } = await firstValueFrom(
      request.pipe(
        catchError((error: AxiosError) => {
          const errorJson = error.toJSON() as any;
          this.logger.error(errorJson);
          if (errorJson?.status == 404 || errorJson?.status == 410) {
            throw new NotFoundException({
              message: 'Username not found',
              chessComErr: error.response.data,
            });
          } else {
            throw new InternalServerErrorException({
              message: 'Chess.com error',
              chessComErr: error.response.data,
            });
          }
        }),
      ),
    );

    return { url, games: data.games };
  }

  validateMatch(match1: MatchChessCom, match2: MatchChessCom): void {
    const usernameWhite1 = match1.white.username || '';
    const usernameBlack1 = match1.black.username || '';
    const usernameWhite2 = match2.white.username || '';
    const usernameBlack2 = match2.black.username || '';

    if (
      usernameWhite1 !== usernameWhite2 ||
      usernameBlack1 !== usernameBlack2
    ) {
      throw new NotFoundException('Games either not found or not finished');
    }
  }

  getWinnerUsername(match: MatchChessCom): string {
    const { black, white } = match;

    let winnerUsername = '';
    if (black.result === 'win') {
      winnerUsername = black.username;
    } else if (white.result === 'win') {
      winnerUsername = white.username;
    }

    return winnerUsername;
  }

  async upsert(chessCom: ChessCom) {
    try {
      return await this.prismaService.chessCom.upsert({
        where: { id: chessCom.id },
        create: chessCom,
        update: chessCom,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findById(id: number) {
    try {
      return await this.prismaService.chessCom.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  private _getMatchMonthAndYear() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
    return { month: month, year };
  }
}
