import { CreateNfeUseCase } from './createNfe.useCase';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NfeRepositoryInMemory } from '@test/inMemory/nfeInMemory.repository';

describe('CreateNfeUseCase', () => {
  let createNfeUseCase: CreateNfeUseCase;
  let nfeRepositoryInMemory: NfeRepositoryInMemory;

  beforeEach(() => {
    nfeRepositoryInMemory = new NfeRepositoryInMemory();
    createNfeUseCase = new CreateNfeUseCase(nfeRepositoryInMemory);
  });

  it('Should be able to create a nfe', async () => {
    const request = {
      chaveNfe: '12345678901234567890123456789012345678901234',
      emissionDate: new Date('2024-04-10'),
      numberNf: 123,
      recipientCNPJ: '12345678000199',
      recipientName: 'Empresa Exemplo',
      series: 1,
      totICMS: 100.5,
      totValue: 1000.75,
      urlDanfe: 'https://danfe.com/exemplo.pdf',
    };

    const { message, status } = await createNfeUseCase.execute(request);
    expect(message).toBe('Nfe criada com sucesso');
    expect(status).toBe(HttpStatus.CREATED);
  });

  it('Should be able to throw Error if any field is empty', async () => {
    const request = {
      chaveNfe: '',
      emissionDate: new Date(),
      numberNf: 1,
      recipientCNPJ: '',
      recipientName: '',
      series: 1,
      totICMS: 0,
      totValue: 0,
    };

    await expect(createNfeUseCase.execute(request)).rejects.toThrow(
      new HttpException(
        'Alguns dos campos vieram vazios',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
