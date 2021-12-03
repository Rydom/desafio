import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class EventoInput {
  @Field()
  readonly nome: string

  @Field()
  readonly eventoTipoId: string
}