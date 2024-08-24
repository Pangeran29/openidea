import { ItemVault as IItemVault } from "@prisma/client";

export class ItemVaults implements IItemVault {
    id: number;
    name: string;
    numberOfItem: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
