import { Module } from '@nestjs/common';
import { ItemVaultService } from './item-vault.service';
import { ItemVaultController } from './item-vault.controller';
import { PrismaService } from '@app/common';

@Module({
  controllers: [ItemVaultController],
  providers: [ItemVaultService, PrismaService],
  exports: [ItemVaultService],
})
export class ItemVaultModule {}
