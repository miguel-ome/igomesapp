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

      filters[key] = propsFilterNfe[key];
    }

    return filters;
  }
}
