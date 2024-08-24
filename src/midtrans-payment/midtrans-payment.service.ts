import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  SnapPaymentType,
  SnapRequestBody,
  SnapToken,
} from './type/snap-midtrans.type';
import { v4 as uuidv4 } from 'uuid';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/user/entities/user.entity';
import { PaymentChannel } from './enum/payment-channel.enum';
import { AmountBasedPaymentChannel } from './type/amount-based-payment-channel.type';
import { TransactionHistory } from './entities/midtrans-payment.entity';
import { PrismaException, PrismaService } from '@app/common';

@Injectable()
export class MidtransPaymentService {
  private readonly logger = new Logger(MidtransPaymentService.name);
  private readonly midtransUri: string;
  private readonly midtransServerKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.midtransUri = this.configService.get('MIDTRANS_BASE_URI');
    this.midtransServerKey = this.configService.get('MIDTRANS_SERVER_KEY');
  }

  async createSnapPayment(snapPayment: SnapPaymentType): Promise<SnapToken> {
    const url = `${this.midtransUri}/snap/v1/transactions`;

    const body: SnapRequestBody = {
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: snapPayment.amount.totalAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: snapPayment.customerDetails.email,
      },
      enabled_payments: [snapPayment.paymentChannel],
      callbacks: {
        finish: snapPayment.redirectUrl,
      },
    };

    let headers: RawAxiosRequestHeaders = {
      Authorization: `Basic ${this._generateServerKey()}`,
    };

    let request = this.httpService.post(url, body, { headers });

    const { data } = await firstValueFrom(
      request.pipe(
        catchError((error: AxiosError) => {
          const errorJson = error.toJSON() as any;
          this.logger.error(errorJson);
          throw new InternalServerErrorException({
            message: 'Midtrans payment gateway error',
            midtransError: error.response.data,
          });
        }),
      ),
    );

    return { ...data, orderId: body.transaction_details.order_id };
  }

  async createTscHistory(transactionHistory: TransactionHistory) {
    try {
      return await this.prismaService.transactionHistory.create({
        data: transactionHistory,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async updateTscHistory(transactionHistory: TransactionHistory) {
    try {
      return await this.prismaService.transactionHistory.update({
        where: { id: transactionHistory.id },
        data: transactionHistory,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findByOrderId(orderId: string) {
    try {
      return await this.prismaService.transactionHistory.findUnique({
        where: { orderId },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  private _generateServerKey() {
    return Buffer.from(this.midtransServerKey + ':').toString('base64');
  }
}
