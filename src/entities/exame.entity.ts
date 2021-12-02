
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import Hospital from "./hospital.entity";
import Internacao from "./internacao.entity";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'exames'})
export default class Exame extends BaseEntity {
  @Field()
  @Column()
  nome: string;
    
  @Field(() => ID)
  @Column({ name: 'paciente_id' })
  pacienteId: number;

  @Field(() => Paciente)
  @ManyToOne(() => Paciente, paciente => paciente.id)
  @JoinColumn({ name: 'paciente_id'})
  paciente: Promise<Paciente>
}