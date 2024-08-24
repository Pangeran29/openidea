import { Injectable } from '@nestjs/common';
import { PrismaException, PrismaService } from '@app/common';
import { ItemVault } from '@prisma/client';

@Injectable()
export class ItemVaultService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(itemVault: ItemVault) {
    try {
      return await this.prismaService.itemVault.create({ data: itemVault });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(itemVault: ItemVault) {
    try {
      return await this.prismaService.itemVault.update({
        where: { id: itemVault.id },
        data: itemVault,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.itemVault.findMany({});
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.itemVault.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.itemVault.delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
