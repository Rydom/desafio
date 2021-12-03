
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EventoTipo from "./evento-tipo.entity";

@ObjectType()
@Entity({ name: 'eventos' })
export default class Evento {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ length: 255 })
  nome: string
 
  @Field(() => ID)
  @Column({ name: 'evento_tipo_id'})
  eventoTipoId: string

  @Field(() => EventoTipo)
  @ManyToOne(() => EventoTipo, eventoTipo => eventoTipo.id)
  @JoinColumn({ name: 'evento_tipo_id'})
  eventoTipo: EventoTipo
}