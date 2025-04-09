import { ListAllNfeUseCase } from '@app/useCase/Nfe/listAllNfe.useCase';
import { NfeViewModel } from '@infra/view-model/NfeViewModel';
import { Controller, Get } from '@nestjs/common';

@Controller('nfe')
export class ListAllNfeController {
  constructor(private listAllNfeUseCase: ListAllNfeUseCase) {}

  @Get()
  async execute() {
    const { message, status, listNfe } = await this.listAllNfeUseCase.execute();

    return {
      status,
      body: {
        message,
        data: listNfe.map((nfe) => NfeViewModel.toHttp(nfe)),
      },
    };
  }
}
