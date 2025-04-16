import { Nfe } from '@app/entities/Nfe/Nfe';

export class NfeViewModel {
  static toHttp(nfe: Nfe) {
    return {
      numberNf: nfe.numberNf,
      series: nfe.series,
      urlDanfe: nfe.urlDanfe,
      chaveNfe: nfe.chaveNfe,
      emissionDate: nfe.emissionDate,
      recipientCNPJ: nfe.recipientCNPJ,
      recipientName: nfe.recipientName,
      totValue: nfe.totValue,
      totICMS: nfe.totICMS,
    };
  }
}
