// Interfaces
import { IsNumberString } from 'class-validator';

export interface IAppRepository<T, TCreate, TUpdate> {
  findAll(where: Partial<T>): Promise<T[]>;
  findOne(where: Partial<T>): Promise<T>;
  findOneById(id: number): Promise<T>;

  create(createEntity: TCreate): Promise<T>;
  update(updateProps: TUpdate, where?: Partial<T>): Promise<any>;
  updateOne(updateProps: TUpdate, where: Partial<T>): Promise<T>;

  delete(where: Partial<T>): Promise<any>;
  deleteOne(where: Partial<T>): Promise<any>;
}
// Types
export type TupleRes<Success, Error> = [Success, null] | [null, Error];
// Classes
export class FindOneParams {
  @IsNumberString()
  id: number;
}
