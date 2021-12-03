import { Field, InputType } from "@nestjs/graphql"
import { SexoRole } from "../../entities/paciente.entity"

@InputType()
export class PacienteInput {
  @Field()
  readonly nome: string

  @Field()
  readonly nascimento: Date

  @Field()
  readonly leitoId: string

  @Field()
  readonly sexo: string

  @Field()
  readonly status: string
}