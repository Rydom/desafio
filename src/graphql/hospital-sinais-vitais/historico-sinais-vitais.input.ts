import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class SinaisVitaisInput {
  @Field()
  readonly pressaoArterial: number 

  @Field()
  readonly frequenciaRespiratoria: number 
  
  @Field()
  readonly pacienteId: string
}