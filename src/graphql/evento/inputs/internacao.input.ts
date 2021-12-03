import { Field, InputType } from "@nestjs/graphql"
import { PacienteInput } from "../../paciente/paciente.input"
import { EventoInput } from "./evento.input"

@InputType()
export class InternacaoInput {
  @Field()
  readonly leitoId: string

  @Field()
  readonly pacienteInput: PacienteInput

  @Field()
  readonly eventoInput: EventoInput

}