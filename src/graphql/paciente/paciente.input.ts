import { Field, InputType } from "@nestjs/graphql"
import { SexoRole } from "../../entities/paciente.entity"

@InputType()
export class PacienteInput {
  @Field()
  readonly nome: string

  @Field()
  readonly nascimento: Date

  @Field()
  readonly sexo: SexoRole
}