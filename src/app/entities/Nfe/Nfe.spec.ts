import { MakeNfe } from '@test/factories/makeNfe';
import { Nfe } from './Nfe';

describe('Nfe', () => {
  it('Should be able to create Nfe', () => {
    const nfe = new Nfe({
      numberNf: 48721,
      series: 27,
      urlDanfe: 'https://innovate-commerce.com',
      chaveNfe: '67530984201274839210094837290183747592038473',
      emissionDate: new Date(),
      recipientCNPJ: '54.901.486/0001-65',
      recipientName: 'Grupo Ferreira',
      totValue: 8943.75,
      totICMS: 531.44,
    });

    expect(nfe).toBeTruthy();
  });

  it('Should be able to update Nfe', () => {
    const infoToCreate = {
      numberNf: 12873,
      series: 2,
      urlDanfe: 'https://nfe.example.com/danfe/12873',
      chaveNfe: '35240412345678000123550010001287351234567891',
      emissionDate: new Date('2025-04-01T10:30:00Z'),
      recipientCNPJ: '45.987.321/0001-09',
      recipientName: 'Comercial Andrade e Filhos LTDA',
      totValue: 1867.45,
      totICMS: 124.32,
    };

    const nfe = MakeNfe.CreateOneNfe(infoToCreate);
    nfe.update({
      numberNf: 48721,
      series: 27,
      urlDanfe: 'https://innovate-commerce.com',
      chaveNfe: '67530984201274839210094837290183747592038473',
      emissionDate: new Date(),
      recipientCNPJ: '54.901.486/0001-65',
      recipientName: 'Grupo Ferreira',
      totValue: 8943.75,
      totICMS: 531.44,
    });

    expect(nfe.numberNf).not.toBe(infoToCreate.numberNf);
    expect(nfe.series).not.toBe(infoToCreate.series);
    expect(nfe.urlDanfe).not.toBe(infoToCreate.urlDanfe);
    expect(nfe.chaveNfe).not.toBe(infoToCreate.chaveNfe);
    expect(nfe.emissionDate).not.toBe(infoToCreate.emissionDate);
    expect(nfe.recipientCNPJ).not.toBe(infoToCreate.recipientCNPJ);
    expect(nfe.recipientName).not.toBe(infoToCreate.recipientName);
    expect(nfe.totValue).not.toBe(infoToCreate.totValue);
    expect(nfe.totICMS).not.toBe(infoToCreate.totICMS);
  });
});
