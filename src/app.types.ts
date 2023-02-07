interface IAppRepository<T, TCreate, TUpdate> {
  findAll(where: Partial<T>): Promise<T[]>;
  findOne(where: Partial<T>): Promise<T>;
  findOneById(id: number): Promise<T>;

  create(createEntity: TCreate): Promise<T>;
  update(updateProps: TUpdate, where?: Partial<T>): Promise<any>;
  updateOne(updateProps: TUpdate, where: Partial<T>): Promise<T>;

  delete(where: Partial<T>): Promise<T>;
  deleteOne(where: Partial<T>): Promise<T>;
}
