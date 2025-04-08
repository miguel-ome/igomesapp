import { Nfe } from '@app/entities/Nfe/Nfe';
import { IFilterPropsListNfe } from '@app/interfaces/IFilterPropsListNfe';
import { NfeRepository } from '@app/repository/NfeRepository';

export class NfeRepositoryInMemory implements NfeRepository {
  private listNfe: Nfe[] = [];

  async create(nfe: Nfe): Promise<void> {
    this.listNfe.push(nfe);
  }

  async delete(id: string): Promise<void> {
    const nfeIndex = this.listNfe.findIndex((nfe) => nfe.id === id);
    if (!nfeIndex) throw new Error('Nfe não encontrada');
    this.listNfe.splice(nfeIndex, 1);
  }

  async save(nfe: Nfe): Promise<void> {
    const nfeIndex = this.listNfe.findIndex(
      (nfeSearch) => nfeSearch.id === nfe.id,
    );
    if (!nfeIndex) throw new Error('Nfe não encontrada');
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
    return this.listNfe;
  }
}
