import { UpdateNfeUseCase } from '@app/useCase/Nfe/updateNfe.useCase';
import { UpdateNfeDTO } from '@infra/http/dto/Nfe/UpdateNfe.DTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('nfe')
export class UpdateNfeController {
  constructor(private updateNfeUseCase: UpdateNfeUseCase) {}

  @Post()
  async execute(@Body() request: UpdateNfeDTO) {
    const { message, status } = await this.updateNfeUseCase.execute(request);

    return {
      status,
      body: {
        message,
      },
    };
  }
}
