import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class HospitalInput {
  @Field()
  readonly nome: string

  @Field()
  readonly cep: string
}