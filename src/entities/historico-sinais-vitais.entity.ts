import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Paciente from './paciente.entity';

@ObjectType()
@Entity({ name: 'historico_sinais_vitais' })
export default class HistoricoSinaisVitais {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  pressaoArterial: number 

  @Field()
  @Column()
  frequenciaRespiratoria: number 
  
  @Field(() => ID)
  @Column({ name: 'paciente_id'})
  pacienteId: string

  @Field(() => Paciente)
  @ManyToOne(() => Paciente, paciente => paciente.id)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Promise<Paciente>

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;  
}
