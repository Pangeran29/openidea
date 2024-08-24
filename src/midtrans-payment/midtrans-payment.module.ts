import { Module } from '@nestjs/common';
import { MidtransPaymentService } from './midtrans-payment.service';
import { MidtransPaymentController } from './midtrans-payment.controller';
import { HttpModule } from '@nestjs/axios';
import { ItemVaultModule } from 'src/item-vault/item-vault.module';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from '@app/common';

@Module({
  controllers: [MidtransPaymentController],
  providers: [MidtransPaymentService, PrismaService],
  imports: [HttpModule, ItemVaultModule, UserModule]
})
export class MidtransPaymentModule {}
