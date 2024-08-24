import { Module } from '@nestjs/common';
import { ChessComService } from './chess-com.service';
import { ChessComController } from './chess-com.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@app/common';
import { MatchRoomModule } from 'src/match-room/match-room.module';

@Module({
  imports: [HttpModule, MatchRoomModule],
  controllers: [ChessComController],
  providers: [ChessComService, PrismaService],
})
export class ChessComModule {}
