import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { EntityWithMeta } from '../common';

@ObjectType()
@Entity('exchange_rates')
export class ExchangeRate extends EntityWithMeta {
    @Field(() => String)
    @Column()
    country!: string;

    @Field(() => String)
    @Column()
    currency!: string;

    @Field(() => Number)
    @Column('decimal')
    amount!: number;

    @Field(() => String)
    @Column()
    code!: string;

    @Field(() => Number)
    @Column('decimal')
    rate!: number;

    @Field(() => Date)
    @Column('timestamptz')
    fetchedAt!: Date;
}
