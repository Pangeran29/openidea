import { PrismaException, PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { MatchRoom } from './entities/match-room.entity';

@Injectable()
export class MatchRoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(matchRoom: MatchRoom): Promise<MatchRoom> {
    try {
      return await this.prismaService.matchRoom.create({ data: matchRoom });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(matchRoom: MatchRoom): Promise<MatchRoom> {
    try {
      return await this.prismaService.matchRoom.update({
        where: { id: matchRoom.id },
        data: matchRoom,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findById(id: number): Promise<MatchRoom|null> {
    try {
      return await this.prismaService.matchRoom.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async detail(id: number): Promise<MatchRoom|null> {
    try {
      return await this.prismaService.matchRoom.findUnique({
        where: { id },
        include: {
            Player1: true,
            Player2: true,
            GamesChessCom: true
        }
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
