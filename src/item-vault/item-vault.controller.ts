import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemVaultService } from './item-vault.service';
import { CreateItemVaultDto } from './dto/create-item-vault.dto';
import { UpdateItemVaultDto } from './dto/update-item-vault.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('item-vault')
@Controller('item-vault')
export class ItemVaultController {
  constructor(private readonly itemVaultService: ItemVaultService) {}

  @Post()
  create(@Body() createItemVaultDto: CreateItemVaultDto) {
    return this.itemVaultService.create(createItemVaultDto.intoItemVault());
  }

  @Get()
  findAll() {
    return this.itemVaultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemVaultService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateItemVaultDto: UpdateItemVaultDto) {
    const itemVault = updateItemVaultDto.intoItemVault();
    itemVault.id = id;
    return await this.itemVaultService.update(itemVault);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemVaultService.remove(+id);
  }
}
