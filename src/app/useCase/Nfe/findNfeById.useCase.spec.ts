import { FindNfeByIdUseCase } from './findNfeById.useCase';
import { Nfe } from '@app/entities/Nfe/Nfe';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MakeNfe } from '@test/factories/MakeNfe';
import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';

describe('FindNfeByIdUseCase', () => {
  let findNfeByIdUseCase: FindNfeByIdUseCase;
  let nfeRepositoryInMemory: NfeRepositoryInMemory;
  let nfeToTest: Nfe;

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    findNfeByIdUseCase = new FindNfeByIdUseCase(nfeRepositoryInMemory);
    nfeToTest = MakeNfe.CreateOneNfe();
    nfeRepositoryInMemory.create(nfeToTest);
  });

  it('Should throw an error if id is not provided', async () => {
    await expect(findNfeByIdUseCase.execute({ id: '' })).rejects.toThrow(
      new HttpException('ID não informado', HttpStatus.BAD_REQUEST),
    );
  });

  it('Should throw an error if nfe is not found', async () => {
    await expect(
      findNfeByIdUseCase.execute({ id: 'invalid-id' }),
    ).rejects.toThrow(
      new HttpException('NFe não encontrada', HttpStatus.NOT_FOUND),
    );
  });

  it('should return nfe if found', async () => {
    const result = await findNfeByIdUseCase.execute({ id: nfeToTest.id });

    expect(result).toEqual({
      status: HttpStatus.OK,
      message: 'NFe encontrada com sucesso',
      nfe: nfeToTest,
    });
  });
});
