import { Nfe } from '@app/entities/Nfe/Nfe';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';

export abstract class NfeRepository {
    abstract create(nfe: Nfe): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract save(nfe: Nfe): Promise<void>;
    abstract listAllNfe(): Promise<Nfe[]>;
    abstract listNfeWithFilter(
        propsFilterNfe: Partial<IFilterPropsListNfe>,
    ): Promise<Nfe[]>;
    abstract findNfeById(id: string): Promise<Nfe>;
}
