
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Evento from "./evento.entity";
import Leito from "./leito.entity";
import Paciente from "./paciente.entity";

@ObjectType()
@Entity({ name: 'paciente_evento'})
export default class PacienteEvento {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

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

  @Field(() => ID)
  @Column({ name: 'leito_id' })
  leitoId: string

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;  
  
  @Field(() => Leito)
  @ManyToOne(() => Leito, leito => leito.id)
  @JoinColumn({ name: 'leito_id'})
  leito: Leito
}