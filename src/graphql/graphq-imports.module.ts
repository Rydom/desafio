import { Module } from "@nestjs/common";
import { EventoTipoResolver } from "./evento-tipo/evento-tipo.resolver";
import { HospitalResolver } from "./hospital/hospital.resolver";
import { LeitoResolver } from "./leito/leito.resolver";
import { PacienteResolver } from "./paciente/paciente.resolver";
import { PubSubModule } from "./pubsub.module";


@Module({
  imports: [PubSubModule],
  providers: [PacienteResolver, HospitalResolver, LeitoResolver, EventoTipoResolver],
  exports: []
})
export class GQLImportsModule {}