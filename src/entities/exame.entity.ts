
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'exames'})
export default class Exame {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

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