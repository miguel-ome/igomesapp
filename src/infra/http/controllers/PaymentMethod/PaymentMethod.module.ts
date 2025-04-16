import { Module } from '@nestjs/common';
import { CreatePaymentMethodUseCase } from '@app/useCase/PaymentMethod/createPaymentMethod';
import { FindPaymentMethodUseCase } from '@app/useCase/PaymentMethod/findPaymentMethodById';
import { ListAllPaymentMethodsUseCase } from '@app/useCase/PaymentMethod/listAllPaymentMethods';
import { UpdatePaymentMethodUseCase } from '@app/useCase/PaymentMethod/updatePaymentMethod';
import { CreatePaymentMethodController } from './CreatePaymentMethod.controller';
import { FindPaymentMethodsByIdController } from './FindPaymentMethodById.controller';
import { ListAllPaymentsMethodsController } from './ListAllPaymentsMethods.controller';
import { UpdatePaymentMethodController } from './UpdatePaymentMethod.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { DeletePaymentMethodController } from './DeletePaymentMethod.controller';
import { DeletePaymentMethodUseCase } from '@app/useCase/PaymentMethod/deletePaymentMethod';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePaymentMethodController,
    DeletePaymentMethodController,
    FindPaymentMethodsByIdController,
    ListAllPaymentsMethodsController,
    UpdatePaymentMethodController,
  ],
  providers: [
    CreatePaymentMethodUseCase,
    DeletePaymentMethodUseCase,
    FindPaymentMethodUseCase,
    ListAllPaymentMethodsUseCase,
    UpdatePaymentMethodUseCase,
  ],
})
export class PaymentMethodModule {}
