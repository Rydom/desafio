import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Exame from './exame.entity';
import Internacao from './internacao.entity';

export enum SexoRole {
  MASCULINO='MASCULINO',
  FEMININO='FEMININO',
  OUTRO='OUTRO'
}
registerEnumType(SexoRole, {
  name: 'SexoRole',
  description: 'The supported options'
})

@ObjectType()
@Entity({ name: 'pacientes' })
export default class Paciente {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  nascimento: Date;

  @Field(() => SexoRole)
  @Column({
    type: 'enum',
    enum: SexoRole
  })
  sexo: SexoRole;

  @Field(() => [Internacao])
  @OneToMany(() => Internacao, (internacao) => internacao.paciente, {
    cascade: true,
  })
  internacoes: Promise<Internacao[]>;

  // associations
  @Field(() => [Exame])
  @OneToMany(() => Exame, (exame) => exame.paciente, {
    cascade: true,
  })
  exames: Promise<Exame[]>;
}
