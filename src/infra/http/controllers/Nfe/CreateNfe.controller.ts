import { CreateNfeUseCase } from '@app/useCase/Nfe/createNfe.useCase';
import { CreateNfeDTO } from '@infra/http/dto/Nfe/CreateNfe.DTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
