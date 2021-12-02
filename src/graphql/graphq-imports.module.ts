import { Module } from "@nestjs/common";
import { PacienteResolver } from "./paciente/paciente.resolver";
import { PubSubModule } from "./pubsub.module";


@Module({
  imports: [PubSubModule],
  providers: [PacienteResolver],
  exports: []
})
export class GQLImportsModule {}