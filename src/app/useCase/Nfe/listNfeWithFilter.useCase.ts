import { Nfe } from '@app/entities/Nfe/Nfe';
import { IdentifyFilters } from '@app/helpers/indentifyFilters';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface ListNfeWithFilterUseCaseRequest extends IFilterPropsListNfe {}

interface ListNfeWithFilterUseCaseResponse {
  status: number;
  message: string;
  listNfe: Nfe[];
}

@Injectable()
export class ListNfeWithFilterUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(
    propsFilterNfe: ListNfeWithFilterUseCaseRequest,
  ): Promise<ListNfeWithFilterUseCaseResponse> {
    const filtersValidate = IdentifyFilters.execute(propsFilterNfe);

    const listNfe = await this.nfeRepository.listNfeWithFilter(filtersValidate);

    if (!listNfe)
      throw new HttpException(
        'Erro no processamento dos dados',
        HttpStatus.BAD_REQUEST,
      );

    return {
      status: 201,
      message: 'Lista de Nfe enviada com sucesso',
      listNfe,
    };
  }
}
