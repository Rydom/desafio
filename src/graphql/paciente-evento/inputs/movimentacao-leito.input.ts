import { Field, InputType } from "@nestjs/graphql"
import { PacienteEventoInput } from "./paciente-evento.input"

@InputType()
export class MovimentacaoLeitoInput {
  @Field()
  readonly pacienteId: string
  
  @Field()
  readonly eventoId: string
  
  @Field()
  readonly novoLeito: string
}