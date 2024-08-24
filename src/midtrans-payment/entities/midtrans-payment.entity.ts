import { TransactionHistory as ITransactionHistory, Prisma} from "@prisma/client";

export class TransactionHistory implements ITransactionHistory {
  id: number;
  userId: number;
  itemVaultId: number;
  detailItem: string;
  transactionTime: string;
  transactionStatus: string;
  transactionId: string;
  three_dsVersion: string;
  statusMessage: string;
  statusCode: string;
  signatureKey: string;
  settlementTime: string;
  paymentType: string;
  orderId: string;
  metadata: Prisma.JsonValue;
  merchantId: string;
  maskedCard: string;
  grossAmount: string;
  fraudStatus: string;
  expiryTime: string;
  eci: string;
  currency: string;
  channelResponseMessage: string;
  channelResponseCode: string;
  cardType: string;
  bank: string;
  approvalCode: string;
  createdAt: Date;
  updatedAt: Date;

}
