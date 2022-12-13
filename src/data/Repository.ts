export interface Repository<T> {
  save(type: T): Promise<T>;
  get(id: string): Promise<T>;
}
