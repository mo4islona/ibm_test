import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E,
  ];
}

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique implements ValidatorConstraintInterface {
  constructor(@InjectConnection() protected readonly connection: Connection) {}

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [Class, findCondition = args.property] = args.constraints;
    const count = await this.connection.getRepository(Class).count({
      where:
        typeof findCondition === 'function'
          ? findCondition(args)
          : { [findCondition || args.property]: value },
    });
    return count === 0;
  }

  public defaultMessage(args: ValidationArguments) {
    const [Class] = args.constraints;
    return `${Class.name || 'Entity'} with the same '${
      args.property
    }' already exist`;
  }
}
