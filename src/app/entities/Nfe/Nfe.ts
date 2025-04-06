import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';

interface NfeSchema {
  numberNf: number;
  series: number;
  urlDanfe?: string;
  chaveNfe: string;
  emissionDate: string;
  recipientCNPJ: number;
  recipientName: string;
  totValue: number;
  totICMS: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

interface updateNfe {
  numberNf: number;
  series: number;
  urlDanfe?: string;
  chaveNfe: string;
  emissionDate: string;
  recipientCNPJ: number;
  recipientName: string;
  totValue: number;
  totICMS: number;
}

export class Nfe {
  private _id: string;
  private props: NfeSchema;

  cconstructor(props: Replace<NfeSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  /////////////
  // Getters
  /////////////
  get numberNf(): number {
    return this.props.numberNf;
  }

  get series(): number {
    return this.props.series;
  }

  get urlDanfe(): string | null {
    return this.props.urlDanfe ? this.props.urlDanfe : null;
  }

  get chaveNfe(): string {
    return this.props.chaveNfe;
  }

  get emissionDate(): string {
    return this.props.emissionDate;
  }

  get recipientCNPJ(): number {
    return this.props.recipientCNPJ;
  }

  get recipientName(): string {
    return this.props.recipientName;
  }

  get totValue(): number {
    return this.props.totValue;
  }

  get totICMS(): number {
    return this.props.totICMS;
  }

  /////////////
  // Methods
  /////////////
  public update({
    chaveNfe,
    emissionDate,
    numberNf,
    recipientCNPJ,
    recipientName,
    series,
    totICMS,
    totValue,
    urlDanfe = '',
  }: updateNfe): void {
    this.props.chaveNfe = chaveNfe;
    this.props.emissionDate = emissionDate;
    this.props.numberNf = numberNf;
    this.props.recipientCNPJ = recipientCNPJ;
    this.props.recipientName = recipientName;
    this.props.series = series;
    this.props.totICMS = totICMS;
    this.props.totValue = totValue;
    this.props.urlDanfe = urlDanfe;

    this.props.updatedAt = new Date();
  }
}
