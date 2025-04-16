import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';

interface NfeSchema {
  numberNf: number;
  series: number;
  urlDanfe?: string;
  chaveNfe: string;
  emissionDate: Date;
  recipientCNPJ: string;
  recipientName: string;
  totValue: number;
  totICMS: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface updateNfe {
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

export class Nfe {
  private _id: string;
  private props: NfeSchema;

  constructor(props: Replace<NfeSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  /////////////
  // Getters
  /////////////
  public get id(): string {
    return this._id;
  }

  public get numberNf(): number {
    return this.props.numberNf;
  }

  public get series(): number {
    return this.props.series;
  }

  public get urlDanfe(): string | null {
    return this.props.urlDanfe ? this.props.urlDanfe : null;
  }

  public get chaveNfe(): string {
    return this.props.chaveNfe;
  }

  public get emissionDate(): Date {
    return this.props.emissionDate;
  }

  public get recipientCNPJ(): string {
    return this.props.recipientCNPJ;
  }

  public get recipientName(): string {
    return this.props.recipientName;
  }

  public get totValue(): number {
    return this.props.totValue;
  }

  public get totICMS(): number {
    return this.props.totICMS;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt ? this.props.updatedAt : null;
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
