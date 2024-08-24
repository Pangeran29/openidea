import { IsOptional } from 'class-validator';
import { TransactionHistory } from '../entities/midtrans-payment.entity';

export class ReceiveMidtransPaymentDto {
  @IsOptional()
  transaction_time?: string = undefined;
  @IsOptional()
  transaction_status?: string = undefined;
  @IsOptional()
  transaction_id?: string = undefined;
  @IsOptional()
  three_ds_version?: string = undefined;
  @IsOptional()
  status_message?: string = undefined;
  @IsOptional()
  status_code?: string = undefined;
  @IsOptional()
  signature_key?: string = undefined;
  @IsOptional()
  settlement_time?: string = undefined;
  @IsOptional()
  payment_type?: string = undefined;
  @IsOptional()
  order_id?: string = undefined;
  @IsOptional()
  metadata?: object = undefined;
  @IsOptional()
  merchant_id?: string = undefined;
  @IsOptional()
  masked_card?: string = undefined;
  @IsOptional()
  gross_amount?: string = undefined;
  @IsOptional()
  fraud_status?: string = undefined;
  @IsOptional()
  expiry_time?: string = undefined;
  @IsOptional()
  eci?: string = undefined;
  @IsOptional()
  currency?: string = undefined;
  @IsOptional()
  channel_response_message?: string = undefined;
  @IsOptional()
  channel_response_code?: string = undefined;
  @IsOptional()
  card_type?: string = undefined;
  @IsOptional()
  bank?: string = undefined;
  @IsOptional()
  approval_code?: string = undefined;

  getGrossAmountNumber(): number {
    return Number(this.gross_amount);
  }

  intoTscHistory(transactionHistory: TransactionHistory): TransactionHistory {
    transactionHistory.transactionTime = this.transaction_time;
    transactionHistory.transactionStatus = this.transaction_status;
    transactionHistory.transactionId = this.transaction_id;
    transactionHistory.three_dsVersion = this.three_ds_version;
    transactionHistory.statusMessage = this.status_message;
    transactionHistory.statusCode = this.status_code;
    transactionHistory.signatureKey = this.signature_key;
    transactionHistory.settlementTime = this.settlement_time;
    transactionHistory.paymentType = this.payment_type;
    transactionHistory.metadata = this.metadata;
    transactionHistory.merchantId = this.merchant_id;
    transactionHistory.maskedCard = this.masked_card;
    transactionHistory.grossAmount = this.gross_amount;
    transactionHistory.fraudStatus = this.fraud_status;
    transactionHistory.expiryTime = this.expiry_time;
    transactionHistory.eci = this.eci;
    transactionHistory.currency = this.currency;
    transactionHistory.channelResponseMessage = this.channel_response_message;
    transactionHistory.channelResponseCode = this.channel_response_code;
    transactionHistory.cardType = this.card_type;
    transactionHistory.bank = this.bank;
    transactionHistory.approvalCode = this.approval_code;
    return transactionHistory;
  }
}

const data = {
  transaction_time: '2023-11-15 18:45:13',
  transaction_status: 'settlement',
  transaction_id: '513f1f01-c9da-474c-9fc9-d5c64364b709',
  status_message: 'midtrans payment notification',
  status_code: '200',
  signature_key:
    '84b0401cf9f3efc534275f3e4f4b3b7957f200d998a5884a5223f514c610834c7f2b3a5086475b7884d3e7b466313ea61844d6333555d4aee995b95ecb911189',
  settlement_time: '2023-11-15 22:45:13',
  payment_type: 'gopay',
  order_id:
    'payment_notif_test_G267694770_56554152-de1d-4831-8f13-be0a929e614c',
  merchant_id: 'G267694770',
  gross_amount: '105000.00',
  fraud_status: 'accept',
  currency: 'IDR',
};
