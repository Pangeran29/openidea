import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MatchRoomService } from './match-room.service';
import { CreateMatchRoomDto } from './dto/create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  GetCurrentUser,
  JwtAuthGuard,
} from '@app/common';
import { MarkPlayerReadyDto } from './dto/mark-player-ready.dto';
import { MarkPlayerFinishDto } from './dto/mark-player-finish.dto';
import { SetOpponentDto } from './dto/set-opponent..dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('match-room')
@Controller('match-room')
export class MatchRoomController {
  constructor(
    private readonly matchRoomService: MatchRoomService,
  ) {}

  @Post('create-room')
  async create(
    @Body() createMatchRoomDto: CreateMatchRoomDto,
    @GetCurrentUser() currentUser: CurrentUser,
  ) {
    const matchRoom = createMatchRoomDto.intoMatchRoom();
    matchRoom.player1Id = currentUser.sub;
    return await this.matchRoomService.create(matchRoom);
  }

  @Patch('set-opponent/:match_room_id')
  async setOpponent(
    @Param('match_room_id') matchRoomId: number,
    @Body() setOpponentDto: SetOpponentDto,
  ) {
    let matchRoom = await this.matchRoomService.findById(matchRoomId);
    if (!matchRoom) {
      throw new NotFoundException('Match room not found');
    }
    matchRoom = setOpponentDto.intoMatchRoom(matchRoom);
    return await this.matchRoomService.update(matchRoom);
  }

  @Patch('mark-player-ready/:match_room_id')
  async markPlayerReady(
    @Param('match_room_id') matchRoomId: number,
    @Body() markPlayerReadyDto: MarkPlayerReadyDto,
  ) {
    let matchRoom = await this.matchRoomService.findById(matchRoomId);
    if (!matchRoom) {
      throw new NotFoundException('Match room not found');
    }
    matchRoom = markPlayerReadyDto.intoMatchRoom(matchRoom);
    return await this.matchRoomService.update(matchRoom);
  }

  @Patch('mark-player-finish/:match_room_id')
  async markPlayerFinish(
    @Param('match_room_id') matchRoomId: number,
    @Body() markPlayerFinishDto: MarkPlayerFinishDto,
  ) {
    let matchRoom = await this.matchRoomService.findById(matchRoomId);
    if (!matchRoom) {
      throw new NotFoundException('Match room not found');
    }
    matchRoom = markPlayerFinishDto.intoMatchRoom(matchRoom);
    return await this.matchRoomService.update(matchRoom);
  }

  @Get('detail-match/:match_room_id')
  async detail(@Param('match_room_id') matchRoomId: number) {
    let matchRoom = await this.matchRoomService.detail(matchRoomId);
    if (!matchRoom) {
      throw new NotFoundException('Match room not found');
    }
    return matchRoom;
  }
}
