import { Nfe } from '@app/entities/Nfe/Nfe';
import { ListAllNfeUseCase } from './listAllNfe.useCase';
import { MakeNfe } from '@test/factories/MakeNfe';
import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';

describe('ListAllNfeUseCase', () => {
  let listAllNfeUseCase: ListAllNfeUseCase;
  let nfeRepositoryInMemory: NfeRepositoryInMemory;
  let listNfeBD: Nfe[] = [];

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    listAllNfeUseCase = new ListAllNfeUseCase(nfeRepositoryInMemory);

    listNfeBD = MakeNfe.CreateMultiNfe(5);

    if (listNfeBD) {
      for (const nfe of listNfeBD) {
        nfeRepositoryInMemory.create(nfe);
      }
    }
  });

  it('should be able to return a list of Nfe', async () => {
    const { listNfe, message, status } = await listAllNfeUseCase.execute();

    expect(listNfe).toEqual(listNfeBD);
    expect(message).toBe('Lista de Nfe enviada com sucesso');
    expect(status).toBe(201);
  });
});
