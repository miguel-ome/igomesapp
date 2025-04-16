import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateNfeController } from './CreateNfe.controller';
import { CreateNfeUseCase } from '@app/useCase/Nfe/createNfe.useCase';
import { ListAllNfeUseCase } from '@app/useCase/Nfe/listAllNfe.useCase';
import { ListAllNfeController } from './ListAllNfe.controller';
import { ListNfeWithFilterController } from './ListNfeWithFilter.controller';
import { ListNfeWithFilterUseCase } from '@app/useCase/Nfe/listNfeWithFilter.useCase';
import { UpdateNfeController } from './UpdateNfe.controller';
import { UpdateNfeUseCase } from '@app/useCase/Nfe/updateNfe.useCase';
import { FindNfeByIdController } from './FindNfeById.controller';
import { FindNfeByIdUseCase } from '@app/useCase/Nfe/findNfeById.useCase';
import { DeleteNfeController } from './DeleteNfe.controller';
import { DeleteNfeUseCase } from '@app/useCase/Nfe/deleteNfe.useCase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateNfeController,
    ListAllNfeController,
    ListNfeWithFilterController,
    UpdateNfeController,
    FindNfeByIdController,
    DeleteNfeController,
  ],
  providers: [
    CreateNfeUseCase,
    ListAllNfeUseCase,
    ListNfeWithFilterUseCase,
    UpdateNfeUseCase,
    FindNfeByIdUseCase,
    DeleteNfeUseCase,
  ],
})
export class NfeModule {}
