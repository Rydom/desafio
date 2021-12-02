
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import Leito from "./leito.entity";

@ObjectType()
@Entity({ name: 'hospitais'})
export default class Hospital extends BaseEntity {
  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  cidade: string;

  @Field()
  @Column()
  estado: string;

  @Field(() => [Leito])
  @OneToMany(() => Leito, leito => leito.hospital, {
    cascade: true,
  })
  leitos: Promise<Leito[]>
  // Array de leitos -> OneToMany
}