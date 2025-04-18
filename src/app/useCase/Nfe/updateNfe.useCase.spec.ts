import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';
import { UpdateNfeUseCase } from './updateNfe.useCase';
import { MakeNfe } from '@test/factories/MakeNfe';
import { Nfe } from '@app/entities/Nfe/Nfe';

describe('Update Nfe', () => {
  let nfeRepositoryInMemory: NfeRepositoryInMemory;
  let updateNfeUseCase: UpdateNfeUseCase;
  let nfeToTest: Nfe;

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    updateNfeUseCase = new UpdateNfeUseCase(nfeRepositoryInMemory);

    nfeToTest = MakeNfe.CreateOneNfe();
    nfeRepositoryInMemory.create(nfeToTest);
  });

  it('Should be able update nfe', async () => {
    const oldName = nfeToTest.recipientName;
    const { message, status } = await updateNfeUseCase.execute({
      chaveNfe: nfeToTest.chaveNfe,
      emissionDate: nfeToTest.emissionDate,
      id: nfeToTest.id,
      numberNf: nfeToTest.numberNf,
      recipientCNPJ: nfeToTest.recipientCNPJ,
      recipientName: 'Distribuidora Paraibana',
      series: nfeToTest.series,
      totICMS: nfeToTest.totICMS,
      totValue: nfeToTest.totValue,
      urlDanfe: nfeToTest.urlDanfe ? nfeToTest.urlDanfe : undefined,
    });

    expect(status).toBe(201);
    expect(message).toBe('Nfe atualizada com sucesso');
    expect(nfeToTest.recipientName).not.toBe(oldName);
    expect(nfeToTest.recipientName).toBe('Distribuidora Paraibana');
  });

  it('Should be throw error if id is empty', async () => {
    await expect(
      updateNfeUseCase.execute({
        chaveNfe: nfeToTest.chaveNfe,
        emissionDate: nfeToTest.emissionDate,
        id: '',
        numberNf: nfeToTest.numberNf,
        recipientCNPJ: nfeToTest.recipientCNPJ,
        recipientName: nfeToTest.recipientName,
        series: nfeToTest.series,
        totICMS: nfeToTest.totICMS,
        totValue: nfeToTest.totValue,
        urlDanfe: nfeToTest.urlDanfe ? nfeToTest.urlDanfe : undefined,
      }),
    ).rejects.toThrow('ID não informado');
  });

  it('Should be throw error if nfe not found', async () => {
    await expect(
      updateNfeUseCase.execute({
        chaveNfe: nfeToTest.chaveNfe,
        emissionDate: nfeToTest.emissionDate,
        id: 'invalid-id',
        numberNf: nfeToTest.numberNf,
        recipientCNPJ: nfeToTest.recipientCNPJ,
        recipientName: nfeToTest.recipientName,
        series: nfeToTest.series,
        totICMS: nfeToTest.totICMS,
        totValue: nfeToTest.totValue,
        urlDanfe: nfeToTest.urlDanfe ? nfeToTest.urlDanfe : undefined,
      }),
    ).rejects.toThrow('Nfe não encontrada');
  });
});
