import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateNfeController } from './CreateNfe.controller';
import { CreateNfeUseCase } from '@app/useCase/Nfe/createNfe.useCase';
import { ListAllNfeUseCase } from '@app/useCase/Nfe/listAllNfe.useCase';
import { ListAllNfeController } from './ListAllNfe.controller';
import { ListNfeWithFilterController } from './ListNfeWithFilter.controller';
import { ListNfeWithFilterUseCase } from '@app/useCase/Nfe/listNfeWithFilter.useCase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateNfeController,
    ListAllNfeController,
    ListNfeWithFilterController,
  ],
  providers: [CreateNfeUseCase, ListAllNfeUseCase, ListNfeWithFilterUseCase],
})
export class NfeModule {}
