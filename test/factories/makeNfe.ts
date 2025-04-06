import { Nfe } from '@app/entities/Nfe/Nfe';
import { faker } from '@faker-js/faker/.';
import { cnpj } from 'cpf-cnpj-validator';

interface MakeNfeSchema {
  numberNf: number;
  series: number;
  urlDanfe?: string;
  chaveNfe: string;
  emissionDate: Date;
  recipientCNPJ: string;
  recipientName: string;
  totValue: number;
  totICMS: number;
}

export class MakeNfe {
  static CreateOneNfe(props?: MakeNfeSchema): Nfe {
    // Return Nfe without props
    if (!props)
      return new Nfe({
        chaveNfe: faker.string.numeric(44),
        emissionDate: new Date(faker.date.anytime()),
        numberNf: faker.number.int(9),
        recipientCNPJ: cnpj.generate(),
        recipientName: faker.company.name(),
        series: faker.number.int(3),
        totICMS: faker.number.float(),
        totValue: faker.number.float(),
        urlDanfe: faker.internet.url(),
      });

    // Return Nfe with props
    const {
      chaveNfe,
      emissionDate,
      numberNf,
      recipientCNPJ,
      recipientName,
      series,
      totICMS,
      totValue,
      urlDanfe,
    } = props;

    return new Nfe({
      chaveNfe,
      emissionDate,
      numberNf,
      recipientCNPJ,
      recipientName,
      series,
      totICMS,
      totValue,
      urlDanfe,
    });
  }

  static CreateMultiNfe(qtdNfe: number, props?: MakeNfeSchema) {
    const listNfe: Nfe[] = [];

    if (qtdNfe < 2) throw new Error('Quantidade de Nfe informada menor que 2');

    // Return Nfe without props
    if (!props) {
      for (let i = 0; i < qtdNfe; i++) {
        listNfe.push(
          new Nfe({
            chaveNfe: faker.string.numeric(44),
            emissionDate: new Date(faker.date.anytime()),
            numberNf: faker.number.int(9),
            recipientCNPJ: cnpj.generate(),
            recipientName: faker.company.name(),
            series: faker.number.int(3),
            totICMS: faker.number.float(),
            totValue: faker.number.float(),
            urlDanfe: faker.internet.url(),
          }),
        );
      }
    }

    // Return Nfe with props
    if (props) {
      listNfe.push(
        new Nfe({
          chaveNfe: props.chaveNfe,
          emissionDate: props.emissionDate,
          numberNf: props.numberNf,
          recipientCNPJ: props.recipientCNPJ,
          recipientName: props.recipientName,
          series: props.series,
          totICMS: props.totICMS,
          totValue: props.totValue,
          urlDanfe: props.urlDanfe,
        }),
      );
      for (let i = 1; i < qtdNfe; i++) {
        listNfe.push(
          new Nfe({
            chaveNfe: faker.string.numeric(44),
            emissionDate: new Date(faker.date.anytime()),
            numberNf: faker.number.int(9),
            recipientCNPJ: cnpj.generate(),
            recipientName: faker.company.name(),
            series: faker.number.int(3),
            totICMS: faker.number.float(),
            totValue: faker.number.float(),
            urlDanfe: faker.internet.url(),
          }),
        );
      }
    }
  }
}
