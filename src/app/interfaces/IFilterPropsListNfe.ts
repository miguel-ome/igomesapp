export interface IFilterPropsListNfe {
  numberNf: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals' | 'contains';
    value: number;
  };
  series: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: number;
  };
  emissionDate: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: Date;
  };
  recipientCNPJ: {
    operator: 'equals' | 'contains';
    value: string;
  };
  recipientName: {
    operator: 'equals' | 'contains';
    value: string;
  };
  totValue: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: number;
  };
  totICMS: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: number;
  };
}
