import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PrismaService } from '../prisma.service';
import { PrismaMapperNfe } from '@infra/mapers/PrismaNfeMapper';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaMapperNfeFilters } from '@infra/mapers/PrismaFiltersNfeMapper';

@Injectable()
export class PrismaNfeRepository implements NfeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(nfe: Nfe): Promise<void> {
    const rowNfe = PrismaMapperNfe.toPrisma(nfe);
    await this.prisma.nfe.create({ data: rowNfe });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.nfe.delete({
      where: {
        id,
      },
    });
  }

  async findNfeById(id: string): Promise<Nfe | null> {
    const nfe = await this.prisma.nfe.findUnique({
      where: {
        id,
      },
    });

    return nfe ? PrismaMapperNfe.toDomain(nfe) : null;
  }

  async save(nfe: Nfe): Promise<void> {
    const rowNfe = PrismaMapperNfe.toPrisma(nfe);
    await this.prisma.nfe.update({
      where: {
        id: nfe.id,
      },
      data: rowNfe,
    });
  }

  async listAllNfe(): Promise<Nfe[]> {
    const listNfe = await this.prisma.nfe.findMany();

    return listNfe.map(PrismaMapperNfe.toDomain);
  }

  async listNfeWithFilter(filters: IFilterPropsListNfe): Promise<Nfe[]> {
    const rowFilters = PrismaMapperNfeFilters.toPrisma(filters);

    const listNfeFiltered = await this.prisma.nfe.findMany({
      where: rowFilters,
    });

    return listNfeFiltered.map(PrismaMapperNfe.toDomain);
  }
}
