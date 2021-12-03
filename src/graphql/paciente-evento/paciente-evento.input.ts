import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class PacienteEventoInput {
  @Field()
  readonly pacienteId: string

  @Field()
  readonly eventoId: string

  @Field()
  readonly leitoId: string
  
}