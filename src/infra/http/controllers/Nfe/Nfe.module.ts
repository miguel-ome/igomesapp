import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateNfeController } from './CreateNfe.controller';
import { CreateNfeUseCase } from '@app/useCase/Nfe/createNfe.useCase';
import { ListAllNfeUseCase } from '@app/useCase/Nfe/listAllNfe.useCase';
import { ListAllNfeController } from './ListAllNfe.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateNfeController, ListAllNfeController],
  providers: [CreateNfeUseCase, ListAllNfeUseCase],
})
export class NfeModule {}
