import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, EntitySchema, In, ObjectType } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

interface ExistsValidationArguments<E> extends ValidationArguments {
  constraints: [ObjectType<E> | EntitySchema<E> | string, string];
}

@ValidatorConstraint({ name: 'exists', async: true })
@Injectable()
export class Exists implements ValidatorConstraintInterface {
  constructor(@InjectConnection() protected readonly connection: Connection) {}

  public async validate<E>(
    value: number[],
    args: ExistsValidationArguments<E>,
  ) {
    const [Class, prop] = args.constraints;
    const count = await this.connection.getRepository(Class).count({
      where: { [prop]: In(value) },
    });

    return count === value.length;
  }

  public defaultMessage(args: ValidationArguments) {
    const [Class] = args.constraints;

    return `${Class.name || 'Entity'} with id '${args.value}' do not exists`;
  }
}
