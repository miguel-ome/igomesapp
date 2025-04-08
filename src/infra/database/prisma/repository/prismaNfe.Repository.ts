import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PrismaService } from '../prisma.service';
import { PrismaMapperNfe } from '@infra/mapers/PrismaNfeMapper';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { Injectable } from '@nestjs/common';

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

  async listNfeWithFilter(propsFilterNfe: IFilterPropsListNfe): Promise<Nfe[]> {
    const where: any = {}; // vamos construir dinamicamente

    for (const key in propsFilterNfe) {
      const filter = propsFilterNfe[key as keyof IFilterPropsListNfe];

      if (
        !filter?.operator ||
        filter.value === undefined ||
        filter.value === null
      )
        continue;

      switch (filter.operator) {
        case 'equals':
          where[key] = { equals: filter.value };
          break;
        case 'contains':
          where[key] = { contains: filter.value, mode: 'insensitive' }; // para strings
          break;
        case 'gte':
          where[key] = { gte: filter.value };
          break;
        case 'lte':
          where[key] = { lte: filter.value };
          break;
        case 'gt':
          where[key] = { gt: filter.value };
          break;
        case 'lt':
          where[key] = { lt: filter.value };
          break;
        default:
          break;
      }
    }

    const listNfeFiltered = await this.prisma.nfe.findMany({
      where,
    });

    return listNfeFiltered.map(PrismaMapperNfe.toDomain);
  }
}
