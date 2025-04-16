import { Nfe, updateNfe } from '@app/entities/Nfe/Nfe';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { NfeRepository } from '@app/repository/NfeRepository';

export class NfeRepositoryInMemory implements NfeRepository {
  private listNfe: Nfe[] = [];

  async create(nfe: Nfe): Promise<void> {
    this.listNfe.push(nfe);
  }

  async delete(id: string): Promise<void> {
    const nfeIndex = this.listNfe.findIndex((nfe) => nfe.id === id);
    if (nfeIndex < 0) throw new Error('Nfe não encontrada');
    this.listNfe.splice(nfeIndex, 1);
  }

  async save(nfe: Nfe): Promise<void> {
    const nfeIndex = this.listNfe.findIndex(
      (nfeSearch) => nfeSearch.id === nfe.id,
    );
    if (nfeIndex < 0) throw new Error('Nfe não encontrada');
    this.listNfe[nfeIndex] = nfe;
  }

  async findNfeById(id: string): Promise<Nfe | null> {
    const nfeIndex = this.listNfe.findIndex((nfeSearch) => nfeSearch.id === id);
    return nfeIndex === -1 ? null : this.listNfe[nfeIndex];
  }

  async listAllNfe(): Promise<Nfe[]> {
    return this.listNfe;
  }

  async listNfeWithFilter(propsFilterNfe: IFilterPropsListNfe): Promise<Nfe[]> {
    const listNfeFiltered = this.listNfe.filter((nfe) => {
      for (const key in propsFilterNfe) {
        const filter = propsFilterNfe[key as keyof IFilterPropsListNfe];
        const value = nfe[key as keyof updateNfe] as unknown;

        if (!filter || filter.value === null || filter.value === undefined) {
          continue;
        }

        const filterValue = filter.value;

        switch (filter.operator) {
          case 'contains':
            if (
              typeof value !== 'string' ||
              typeof filterValue !== 'string' ||
              !value.toLowerCase().includes(filterValue.toLowerCase())
            ) {
              return false;
            }
            break;

          case 'equals':
            if (value !== filterValue) {
              return false;
            }
            break;

          case 'gt':
            if (
              (typeof value === 'number' &&
                typeof filterValue === 'number' &&
                value <= filterValue) ||
              (value instanceof Date &&
                filterValue instanceof Date &&
                value.getTime() <= filterValue.getTime())
            ) {
              return false;
            }
            break;

          case 'gte':
            if (
              (typeof value === 'number' &&
                typeof filterValue === 'number' &&
                value < filterValue) ||
              (value instanceof Date &&
                filterValue instanceof Date &&
                value.getTime() < filterValue.getTime())
            ) {
              return false;
            }
            break;

          case 'lt':
            if (
              (typeof value === 'number' &&
                typeof filterValue === 'number' &&
                value >= filterValue) ||
              (value instanceof Date &&
                filterValue instanceof Date &&
                value.getTime() >= filterValue.getTime())
            ) {
              return false;
            }
            break;

          case 'lte':
            if (
              (typeof value === 'number' &&
                typeof filterValue === 'number' &&
                value > filterValue) ||
              (value instanceof Date &&
                filterValue instanceof Date &&
                value.getTime() > filterValue.getTime())
            ) {
              return false;
            }
            break;

          default:
            return false;
        }
      }

      return true; // passou por todos os filtros
    });

    return listNfeFiltered;
  }
}
