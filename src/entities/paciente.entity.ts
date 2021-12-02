import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import Exame from "./exame.entity";
import Internacao from "./internacao.entity";

export enum SexoRole {
  Masculino = "M",
  Feminino = "F",
  Outro = "O"
}

@ObjectType()
@Entity({ name: 'pacientes'})
export default class Paciente extends BaseEntity {
  @Field()
  @Column()
  nome: string

  @Field()
  @Column()
  nascimento: Date

  @Field()
  @Column({
    type: "enum",
    enum: SexoRole
  })
  sexo: string

  @Field(() => [Internacao])
  @OneToMany(() => Internacao, internacao => internacao.paciente, {
    cascade: true,
  })
  internacoes: Promise<Internacao[]>
  
  // associations
  @Field(() => [Exame])
  @OneToMany(() => Exame, exame => exame.paciente, {
    cascade: true,
  })
  exames: Promise<Exame[]>;
}