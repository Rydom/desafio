
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import Hospital from "./hospital.entity";
import Internacao from "./internacao.entity";

@ObjectType()
@Entity({ name: 'leitos'})
export default class Leito extends BaseEntity {
  @Field()
  @Column()
  descricao: string;
  
  @Field(() => ID)
  @Column()
  hospitalId: number;

  @Field()
  @Column()
  ocupado: boolean;
  
  @Field(() => Hospital)
  @ManyToOne(() => Hospital, hospital => hospital.leitos)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Promise<Hospital>

  @Field(() => [Internacao])
  @OneToMany(() => Internacao, internacao => internacao.leito, {
    cascade: true,
  })
  internacoes: Promise<Internacao[]>
}