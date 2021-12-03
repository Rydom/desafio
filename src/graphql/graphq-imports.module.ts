import { Module } from '@nestjs/common';
import HistoricoSinaisVitais from '../entities/historico-sinais-vitais.entity';
import { EventoTipoResolver } from './evento-tipo/evento-tipo.resolver';
import { EventoResolver } from './evento/evento.resolver';
import { HospitalResolver } from './hospital/hospital.resolver';
import { LeitoResolver } from './leito/leito.resolver';
import { PacienteEventoResolver } from './paciente-evento/paciente-evento.resolver';
import { PacienteResolver } from './paciente/paciente.resolver';
import { PubSubModule } from './pubsub.module';

@Module({
  imports: [PubSubModule],
  providers: [
    PacienteResolver,
    HospitalResolver,
    LeitoResolver,
    EventoResolver,
    EventoTipoResolver,
    PacienteEventoResolver,
    HistoricoSinaisVitais
  ],
  exports: [],
})
export class GQLImportsModule {}
