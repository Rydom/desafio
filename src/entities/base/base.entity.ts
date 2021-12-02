import { Field, ID } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";


export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

}