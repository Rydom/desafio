import { Field, InputType } from "@nestjs/graphql"
import { PacienteEventoInput } from "../../paciente-evento/paciente-evento.input"
import { SinaisVitaisInput } from "./sinais-vitais.input"

@InputType()
export class HistoricoSinaisVitaisInput {
  @Field()
  readonly pacienteEventoInput: PacienteEventoInput

  @Field()
  readonly sinaisVitaisInput: SinaisVitaisInput
}