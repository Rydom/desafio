
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Evento from "./evento.entity";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'paciente_evento'})
export default class Leito {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Field(() => ID)
  @Column({ name: 'paciente_id' })
  pacienteId: string

  @Field(() => Paciente)
  @ManyToOne(() => Paciente, paciente => paciente.id)
  @JoinColumn({ name: 'paciente_id'})
  paciente: Paciente
  
  @Field(() => ID)
  @Column({ name: 'evento_id' })
  eventoId: string

  @Field(() => Evento)
  @ManyToOne(() => Evento, evento => evento.id)
  @JoinColumn({ name: 'evento_id'})
  evento: Evento

}