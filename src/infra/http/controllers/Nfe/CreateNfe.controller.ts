import { CreateNfeUseCase } from '@app/useCase/Nfe/createNfe.useCase';
import { CreateNfeDTO } from '@infra/http/dto/Nfe/CreateNfe.DTO';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('nfe')
export class CreateNfeController {
  constructor(private createNfeUseCase: CreateNfeUseCase) {}

  @Post()
  async execute(@Body() request: CreateNfeDTO) {
    const { message, status } = await this.createNfeUseCase.execute(request);

    return {
      status,
      body: {
        message,
      },
    };
  }
}
