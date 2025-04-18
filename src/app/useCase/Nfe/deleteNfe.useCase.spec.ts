import { DeleteNfeUseCase } from './deleteNfe.useCase';
import { HttpStatus } from '@nestjs/common';
import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';
import { MakeNfe } from '@test/factories/MakeNfe';
import { Nfe } from '@app/entities/Nfe/Nfe';

describe('DeleteNfeUseCase', () => {
  let deleteNfeUseCase: DeleteNfeUseCase;
  let nfeRepositoryInMemory: NfeRepositoryInMemory;
  let nfeToTest: Nfe;

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    deleteNfeUseCase = new DeleteNfeUseCase(nfeRepositoryInMemory);

    nfeToTest = MakeNfe.CreateOneNfe();
    nfeRepositoryInMemory.create(nfeToTest);
  });

  it('Should delete an existing NFe and return success message', async () => {
    const { message, status } = await deleteNfeUseCase.execute({
      id: nfeToTest.id,
    });

    expect(status).toBe(HttpStatus.NO_CONTENT);
    expect(message).toBe('Nfe deletada com sucesso');

    // const found = await nfeRepositoryInMemory.findNfeById(nfeToTest.id);
    // expect(found).toBeNull(); // confirma que foi deletado
  });

  // it('Should throw an error if ID is not provided', async () => {
  //   await expect(deleteNfeUseCase.execute({ id: '' })).rejects.toThrow(
  //     'ID não informado',
  //   );
  // });

  // it('Should throw an error if NFe does not exist', async () => {
  //   await expect(
  //     deleteNfeUseCase.execute({ id: 'invalid-id' }),
  //   ).rejects.toThrow('Nfe não encontrada');
  // });
});
