import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Leito from './leito.entity';

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
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ length: 255 })
  nome: string;

  @Field()
  @Column()
  nascimento: Date;

  @Field(() => SexoRole)
  @Column({
    type: 'enum',
    enum: SexoRole,
    // length: 9
  })
  sexo: SexoRole;

  @Field()
  @Column({ length: 15 })
  status: string;

  @Field(() => ID)
  @Column({ name: 'leito_id '})
  leitoId: string;

  @Field()
  @OneToOne(() => Leito, { eager: true })
  @JoinColumn({ name: 'leito_id'})
  leito: Leito;
}
