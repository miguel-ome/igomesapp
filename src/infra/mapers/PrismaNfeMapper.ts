import { Nfe } from '@app/entities/Nfe/Nfe';
import { Prisma, Nfe as RowNfe } from '@prisma/client';

export class PrismaMapperNfe {
  static toPrisma(nfe: Nfe) {
    return {
      id: nfe.id,
      numberNf: nfe.numberNf,
      series: nfe.series,
      urlDanfe: nfe.urlDanfe,
      chaveNfe: nfe.chaveNfe,
      emissionDate: nfe.emissionDate,
      recipientCNPJ: nfe.recipientCNPJ,
      recipientName: nfe.recipientName,
      totValue: new Prisma.Decimal(nfe.totValue),
      totICMS: new Prisma.Decimal(nfe.totICMS),
      createdAt: nfe.createdAt,
      updatedAt: nfe.updatedAt,
    };
  }

  static toDomain(rowNfe: RowNfe) {
    return new Nfe(
      {
        numberNf: rowNfe.numberNf,
        series: rowNfe.series,
        urlDanfe: rowNfe.urlDanfe || '',
        chaveNfe: rowNfe.chaveNfe,
        emissionDate: rowNfe.emissionDate,
        recipientCNPJ: rowNfe.recipientCNPJ,
        recipientName: rowNfe.recipientName,
        totValue: Number(rowNfe.totValue),
        totICMS: Number(rowNfe.totICMS),
        createdAt: rowNfe.createdAt,
        updatedAt: rowNfe.updatedAt,
      },
      rowNfe.id,
    );
  }
}
