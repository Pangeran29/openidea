import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MidtransPaymentService } from './midtrans-payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, GetCurrentUser, JwtAuthGuard } from '@app/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ItemVaultService } from 'src/item-vault/item-vault.service';
import { UserService } from 'src/user/user.service';
import { SnapPayment } from './dto/snap.payment.dto';
import { ReceiveMidtransPaymentDto } from './dto/receive-payment.dto';
import { TransactionHistory } from './entities/midtrans-payment.entity';

@ApiBearerAuth()
@ApiTags('midtrans-payment')
@Controller('midtrans-payment')
export class MidtransPaymentController {
  constructor(
    private readonly midtransPaymentService: MidtransPaymentService,
    private readonly itemVaultService: ItemVaultService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-snap-payment')
  async createPayment(
    @GetCurrentUser() currentUser: CurrentUser,
    @Body() createSnapPaymentDto: CreatePaymentDto,
  ) {
    const user = await this.userService.findById(currentUser.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemVault = await this.itemVaultService.findOne(
      createSnapPaymentDto.itemVaultId,
    );
    if (!itemVault) {
      throw new NotFoundException('Item vault not found');
    }

    const snapPayment = new SnapPayment(
      user.email,
      itemVault.price,
      createSnapPaymentDto.paymentChannel,
      createSnapPaymentDto.redirectUrl
    );

    const snapToken = await this.midtransPaymentService.createSnapPayment(
      snapPayment.getSnapPayment(),
    );

    const tscHistory = new TransactionHistory();
    tscHistory.userId = user.id;
    tscHistory.itemVaultId = itemVault.id;
    tscHistory.orderId = snapToken.orderId;
    const paymentHistory =
      await this.midtransPaymentService.createTscHistory(tscHistory);

    return { paymentHistory, snapToken };
  }

  @Post('receive-payment')
  async receivePayment(
    @Body() receiveMidtransPaymentDto: ReceiveMidtransPaymentDto,
  ) {
    let tscHistory = await this.midtransPaymentService.findByOrderId(
      receiveMidtransPaymentDto.order_id,
    );
    if (!tscHistory) {
      throw new NotFoundException('Transaction History not found');
    }

    let user = await this.userService.findById(tscHistory.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemVault = await this.itemVaultService.findOne(
      tscHistory.itemVaultId,
    );
    if (!itemVault) {
      throw new NotFoundException('Item vault not found');
    }

    user.totalTicket = user.totalTicket + itemVault.numberOfItem;
    user = await this.userService.update(user);

    return await this.midtransPaymentService.updateTscHistory(
      receiveMidtransPaymentDto.intoTscHistory(tscHistory),
    );
  }
}
