
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

  @Field()
  @Column()
  data: Date
 
  @Field(() => ID)
  @Column()
  eventoTipoId: string
  
  @ManyToOne(() => EventoTipo, eventoTipo => eventoTipo.id)
  @JoinColumn({ name: 'evento_tipo_id'})
  eventoTipo: EventoTipo
}