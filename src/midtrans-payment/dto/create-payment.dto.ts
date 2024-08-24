import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { PaymentChannel } from '../enum/payment-channel.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  itemVaultId: number;

  @IsNotEmpty()
  @IsEnum(PaymentChannel)
  paymentChannel: PaymentChannel;

  @IsNotEmpty()
  @IsUrl()
  redirectUrl: string;
}
