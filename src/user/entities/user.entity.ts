import { User as IUser } from "@prisma/client";

export class User implements IUser {
    totalTicket: number;
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    totalDiamond: number;
}
