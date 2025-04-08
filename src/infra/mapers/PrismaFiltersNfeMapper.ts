import { Nfe } from '@app/entities/Nfe/Nfe';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { Prisma, Nfe as RowNfe } from '@prisma/client';

export class PrismaMapperNfeFilters {
  static toPrisma(filters: IFilterPropsListNfe): Prisma.NfeWhereInput {
    const where: Prisma.NfeWhereInput = {};

    for (const key in filters) {
      const filter = filters[key as keyof IFilterPropsListNfe];
      if (!filter) continue;

      switch (filter.operator) {
        case 'equals':
          where[key] = { equals: filter.value };
          break;
        case 'contains':
          where[key] = { contains: filter.value, mode: 'insensitive' };
          break;
        case 'gt':
          where[key] = { gt: filter.value };
          break;
        case 'lt':
          where[key] = { lt: filter.value };
          break;
        case 'gte':
          where[key] = { gte: filter.value };
          break;
        case 'lte':
          where[key] = { lte: filter.value };
          break;
      }
    }

    return where;
  }
}
