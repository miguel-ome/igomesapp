import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';

export class IdentifyFilters {
  static execute(propsFilterNfe: IFilterPropsListNfe): IFilterPropsListNfe {
    const filters: IFilterPropsListNfe = {};

    for (const key in propsFilterNfe) {
      const filter = propsFilterNfe[key as keyof IFilterPropsListNfe];

      if (
        !filter?.operator ||
        filter.value === null ||
        filter.value == undefined
      )
        continue;

      switch (filter.operator) {
        case 'equals':
          filters[key] = { equals: filter.value };
          break;
        case 'contains':
          filters[key] = { contains: filter.value, mode: 'insensitive' };
          break;
        case 'gt':
          filters[key] = { gt: filter.value };
          break;
        case 'lt':
          filters[key] = { lt: filter.value };
          break;
        case 'gte':
          filters[key] = { gte: filter.value };
          break;
        case 'lte':
          filters[key] = { lte: filter.value };
          break;
      }
    }

    return filters;
  }
}
