import { Module } from '@nestjs/common';
import { MatchRoomService } from './match-room.service';
import { MatchRoomController } from './match-room.controller';
import { PrismaService } from '@app/common';

@Module({
  controllers: [MatchRoomController],
  providers: [MatchRoomService, PrismaService],
  exports: [MatchRoomService],
})
export class MatchRoomModule {}
