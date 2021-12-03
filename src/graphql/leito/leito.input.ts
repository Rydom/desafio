import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class LeitoInput {
  @Field()
  readonly descricao: string

  @Field()
  readonly hospitalId: string

  @Field()
  readonly ocupado: boolean = false
}