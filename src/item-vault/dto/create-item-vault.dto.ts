import { ItemVault } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemVaults } from '../entities/item-vault.entity';

export class CreateItemVaultDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfItem: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  intoItemVault(): ItemVault {
    const itemVault = new ItemVaults();
    itemVault.name = this.name;
    itemVault.numberOfItem = this.numberOfItem;
    itemVault.price = this.price;
    return itemVault;
  }
}
