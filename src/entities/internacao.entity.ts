
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Leito from "./leito.entity";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'internacoes'})
export default class Internacao {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => ID)
  @Column({ name: 'paciente_id' })
  pacienteId: number

  @Field(() => ID)
  @Column({ name: 'leito_id' })
  leitoId: number

  @Field(() => Paciente)
  @ManyToOne(() => Paciente, paciente => paciente.internacoes)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Promise<Paciente>

  @Field(() => Leito)
  @ManyToOne(() => Leito, leito => leito.internacoes)
  @JoinColumn({ name: 'leito_id' })
  leito: Promise<Leito>
}