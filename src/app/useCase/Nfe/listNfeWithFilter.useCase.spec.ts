import { MakeNfe } from '@test/factories/MakeNfe';
import { NfeRepositoryInMemory } from '@test/inMemory/nfeInMemory.repository';
import { ListNfeWithFilterUseCase } from './listNfeWithFilter.useCase';

describe('Nfe filtered', () => {
  let nfeRepositoryInMemory: NfeRepositoryInMemory;
  let listNfeWithFilterUseCase: ListNfeWithFilterUseCase;

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    listNfeWithFilterUseCase = new ListNfeWithFilterUseCase(
      nfeRepositoryInMemory,
    );

    nfeRepositoryInMemory.create(
      MakeNfe.CreateOneNfe({
        numberNf: 1001,
        series: 1,
        urlDanfe: 'https://exemplo.com/danfe/1001',
        chaveNfe: '12345678901234567890123456789010000000000001',
        emissionDate: new Date('2024-01-10'),
        recipientCNPJ: '12345678000100',
        recipientName: 'Empresa Alpha Ltda',
        totValue: 1500.75,
        totICMS: 250.75,
      }),
    );
    nfeRepositoryInMemory.create(
      MakeNfe.CreateOneNfe({
        numberNf: 1002,
        series: 2,
        urlDanfe: 'https://exemplo.com/danfe/1002',
        chaveNfe: '12345678901234567890123456789020000000000002',
        emissionDate: new Date('2024-03-22'),
        recipientCNPJ: '87654321000155',
        recipientName: 'Comercial Beta ME',
        totValue: 2100.0,
        totICMS: 430.0,
      }),
    );
    nfeRepositoryInMemory.create(
      MakeNfe.CreateOneNfe({
        numberNf: 1003,
        series: 2,
        urlDanfe: 'https://exemplo.com/danfe/1003',
        chaveNfe: '12345678901234567890123456789030000000000003',
        emissionDate: new Date('2024-05-01'),
        recipientCNPJ: '56473829000177',
        recipientName: 'Distribuidora Gama SA',
        totValue: 700.0,
        totICMS: 80.0,
      }),
    );
  });

  it('should filter by numberNf equals', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      numberNf: { operator: 'equals', value: 1002 },
    });
    expect(listNfe).toHaveLength(1);
    expect(listNfe[0].numberNf).toBe(1002);
  });

  it('should filter by recipientName contains', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      recipientName: { operator: 'contains', value: 'Beta' },
    });
    expect(listNfe).toHaveLength(1);
    expect(listNfe[0].recipientName).toContain('Beta');
  });

  it('should filter by totValue greater than', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      totValue: { operator: 'gt', value: 2000 },
    });
    expect(listNfe).toHaveLength(1);
    expect(listNfe[0].totValue).toBeGreaterThan(2000);
  });

  it('should filter by totValue greater than or equal', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      totValue: { operator: 'gte', value: 1500.75 },
    });
    expect(listNfe).toHaveLength(2);
  });

  it('should filter by emissionDate less than', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      emissionDate: { operator: 'lt', value: new Date('2024-04-01') },
    });
    expect(listNfe).toHaveLength(2);
  });

  it('should filter by emissionDate less than or equal', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      emissionDate: { operator: 'lte', value: new Date('2024-03-22') },
    });
    expect(listNfe).toHaveLength(2);
  });

  it('should filter by multiple conditions together', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      series: { operator: 'equals', value: 2 },
      recipientCNPJ: { operator: 'contains', value: '0001' },
      totICMS: { operator: 'lte', value: 430 },
    });

    expect(listNfe).toHaveLength(2);
  });

  it('should return empty list when no Nfe matches', async () => {
    const { listNfe } = await listNfeWithFilterUseCase.execute({
      numberNf: { operator: 'equals', value: 9999 },
    });
    expect(listNfe).toHaveLength(0);
  });
});
