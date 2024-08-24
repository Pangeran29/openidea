import { PaymentChannel } from '../enum/payment-channel.enum';
import { AmountBasedPaymentChannel } from './amount-based-payment-channel.type';

export type SnapRequestBody = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  credit_card: {
    secure: boolean;
  };
  customer_details: {
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
  };
  enabled_payments?: PaymentChannel[];
  callbacks: {
    finish: string;
  };
};

export type SnapPaymentType = {
  redirectUrl: string;
  amount: AmountBasedPaymentChannel;
  customerDetails: {
    email: string;
  };
  paymentChannel: PaymentChannel;
};

export type SnapToken = {
  token: string;
  redirectUrl: string;
  orderId: string;
};
