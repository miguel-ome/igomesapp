import { Nfe } from '@app/entities/Nfe/Nfe';
import { faker } from '@faker-js/faker/.';
import { cnpj } from 'cpf-cnpj-validator';

interface MakeNfeSchema {
    numberNf: number;
    series: number;
    urlDanfe: string;
    chaveNfe: string;
    emissionDate: Date;
    recipientCNPJ: string;
    recipientName: string;
    totValue: number;
    totICMS: number;
}

export class MakeNfe {
    static CreateOneNfe(props?: Partial<MakeNfeSchema>): Nfe {
        // Return 1 Nfe without props
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

        // Return 1 Nfe with props
        return new Nfe({
            chaveNfe: props?.chaveNfe || faker.string.numeric(44),
            emissionDate: props?.emissionDate || new Date(faker.date.anytime()),
            numberNf: props?.numberNf || faker.number.int(9),
            recipientCNPJ: props?.recipientCNPJ || cnpj.generate(),
            recipientName: props?.recipientName || faker.company.name(),
            series: props?.series || faker.number.int(3),
            totICMS: props?.totICMS || faker.number.float(),
            totValue: props?.totValue || faker.number.float(),
            urlDanfe: props?.urlDanfe || faker.internet.url(),
        });
    }

    static CreateMultiNfe(qtdNfe: number, props?: Partial<MakeNfeSchema>) {
        const listNfe: Nfe[] = [];

        if (qtdNfe < 2)
            throw new Error('Quantidade de Nfe informada menor que 2');

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
                    chaveNfe: props?.chaveNfe || faker.string.numeric(44),
                    emissionDate:
                        props?.emissionDate || new Date(faker.date.anytime()),
                    numberNf: props?.numberNf || faker.number.int(9),
                    recipientCNPJ: props?.recipientCNPJ || cnpj.generate(),
                    recipientName: props?.recipientName || faker.company.name(),
                    series: props?.series || faker.number.int(3),
                    totICMS: props?.totICMS || faker.number.float(),
                    totValue: props?.totValue || faker.number.float(),
                    urlDanfe: props?.urlDanfe || faker.internet.url(),
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
