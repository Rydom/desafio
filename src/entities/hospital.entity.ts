
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Leito from "./leito.entity";

@ObjectType()
@Entity({ name: 'hospitais'})
export default class Hospital {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

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