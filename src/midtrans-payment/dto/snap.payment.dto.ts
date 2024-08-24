import { PaymentChannel } from '../enum/payment-channel.enum';
import { SnapPaymentType } from '../type/snap-midtrans.type';

export class SnapPayment {
  private amount: number;
  private transactionFee: number;
  private email: string;
  private paymentChannel: PaymentChannel;
  private redirectUrl: string;

  constructor(
    email: string,
    amount: number,
    paymentChannel: PaymentChannel,
    redirectUrl: string,
  ) {
    this.amount = amount;
    this.email = email;
    this.paymentChannel = paymentChannel;
    this.redirectUrl = redirectUrl;

    {
      let transactionFee: number = 0;
      switch (this.paymentChannel) {
        case PaymentChannel.CREDIT_CARD:
          // 2,9% + IDR 2,000
          transactionFee = (3.19 * this.amount) / 100 + 2000;
          break;
        case PaymentChannel.GOPAY:
          // 2%
          transactionFee = (2.05 * this.amount) / 100;
          break;
        case PaymentChannel.SHOOPE_PAY:
          // 2%
          transactionFee = (2.05 * this.amount) / 100;
          break;
        case PaymentChannel.PERMATA:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.BCA:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.BNI:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.BRI:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.CIMBNIAGA:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.ECHANNEL:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.OTHER_VA:
          // IDR 2,000
          transactionFee = 2000;
          break;
        case PaymentChannel.ALFAMART:
          // IDR 5,000
          transactionFee = 5000;
          break;
      }

      transactionFee = Math.round(transactionFee);

      this.transactionFee = transactionFee;
      this.amount = Math.round(this.amount) + transactionFee;
    }
  }

  getSnapPayment(): SnapPaymentType {
    return {
      redirectUrl: this.redirectUrl,
      amount: { totalAmount: this.amount, transactionFee: this.transactionFee },
      customerDetails: {
        email: this.email,
      },
      paymentChannel: this.paymentChannel,
    };
  }
}
