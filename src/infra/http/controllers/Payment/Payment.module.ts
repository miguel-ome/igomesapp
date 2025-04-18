import { CreatePaymentUseCase } from '@app/useCase/Payment/createPayment.useCase';
import { DeletePaymentUseCase } from '@app/useCase/Payment/deletePaymente.useCase';
import { FindPaymentByIdUseCase } from '@app/useCase/Payment/findPaymentById.useCase';
import { ListAllPaymentUseCase } from '@app/useCase/Payment/listAllPayment.useCase';
import { UpdatePaymentUseCase } from '@app/useCase/Payment/updatePayment.useCase';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePaymentController } from './CreatePayment.controller';
import { DeletePaymentController } from './DeletePayment.controller';
import { UpdatePaymentController } from './UpdatePayment.controller';
import { ListAllPaymentController } from './ListAllPayment.controller';
import { FindPaymentByIdController } from './FindPaymentById.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePaymentController,
    DeletePaymentController,
    UpdatePaymentController,
    ListAllPaymentController,
    FindPaymentByIdController,
  ],
  providers: [
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    UpdatePaymentUseCase,
    ListAllPaymentUseCase,
    FindPaymentByIdUseCase,
  ],
})
export class PaymentModule {}
