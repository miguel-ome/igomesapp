export interface IFilterPropsListPayment {
  paymentMethod?: {
    operator: 'equals' | 'contains';
    value: string;
  };
  numberNf?: {
    operator: 'equals' | 'contains';
    value: number;
  };
  recipientName?: {
    operator: 'equals' | 'contains';
    value: string;
  };
  dueDate?: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: Date;
  };
  emissionDate?: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: Date;
  };
  receivedDate?: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: Date;
  };
  value?: {
    operator: 'gte' | 'lte' | 'gt' | 'lt' | 'equals';
    value: number;
  };
}
