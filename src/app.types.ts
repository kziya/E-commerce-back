// Interfaces
import { IsNumberString, IsUUID } from 'class-validator';

export interface IAppRepository<T, TCreate, TUpdate> {
  findAll(where: Partial<T>): Promise<T[]>;
  findOne(where: Partial<T>): Promise<T>;
  findOneById(id: number): Promise<T>;

  create(createEntity: TCreate): Promise<T>;
  update(updateProps: TUpdate, where?: Partial<T>): Promise<{ count: number }>;
  updateOne(updateProps: TUpdate, where: Partial<T>): Promise<T>;

  delete(where: Partial<T>): Promise<{ count: number }>;
  deleteOne(where: Partial<T>): Promise<T>;
}
// Types
export type TupleRes<Success, Error> = [Success, null] | [null, Error];
// Classes
export class IdParams {
  @IsNumberString()
  id: number;
}

export class UUIDParams {
  @IsUUID()
  uuid: string;
}
