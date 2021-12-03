import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class EventoTipoInput {
  @Field()
  readonly nome: string
}