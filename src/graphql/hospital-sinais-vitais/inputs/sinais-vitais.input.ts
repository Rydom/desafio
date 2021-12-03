import { Field, InputType } from "@nestjs/graphql"
import { PacienteEventoInput } from "../../paciente-evento/paciente-evento.input"


@InputType()
export class SinaisVitaisInput {
 
  @Field()
  readonly pressaoArterial: number 

  @Field()
  readonly frequenciaRespiratoria: number 
  
  @Field()
  readonly pacienteId: string
}