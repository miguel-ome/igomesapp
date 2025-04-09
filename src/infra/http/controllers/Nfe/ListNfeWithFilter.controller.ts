import { ListNfeWithFilterUseCase } from '@app/useCase/Nfe/listNfeWithFilter.useCase';
import { FilterNfeDTO } from '@infra/http/dto/Nfe/FiltersNfe.DTO';
import { NfeViewModel } from '@infra/view-model/NfeViewModel';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('nfe')
export class ListNfeWithFilterController {
  constructor(private listNfeWithFilter: ListNfeWithFilterUseCase) {}

  @Post('filtered')
  async execute(@Body() request: FilterNfeDTO) {
    const { listNfe, message, status } =
      await this.listNfeWithFilter.execute(request);

    return {
      status,
      body: {
        message,
        data: listNfe.map((nfe) => NfeViewModel.toHttp(nfe)),
      },
    };
  }
}
