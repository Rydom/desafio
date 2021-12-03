
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'eventos' })
export default class Evento {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ length: 255 })
  nome: string

  @Field()
  @Column()
  data: Date
}