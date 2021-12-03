
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hospital from "./hospital.entity";

@ObjectType()
@Entity({ name: 'leitos'})
export default class Leito {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Field()
  @Column()
  descricao: string;
  
  @Field(() => ID)
  @Column({ name: 'hospital_id'})
  hospitalId: string;

  @Field()
  @Column()
  ocupado: boolean;
  
  @Field(() => Hospital)
  @ManyToOne(() => Hospital, hospital => hospital.leitos)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Promise<Hospital>
}