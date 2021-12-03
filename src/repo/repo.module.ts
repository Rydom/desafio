import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import RepoService from './repo.service';
import Paciente from '../entities/paciente.entity';
import Leito from '../entities/leito.entity';
import Hospital from '../entities/hospital.entity';
import EventoTipo from '../entities/evento-tipo.entity';
import Evento from '../entities/evento.entity';
import PacienteEvento from '../entities/paciente-evento.entity';
import HistoricoSinaisVitais from '../entities/historico-sinais-vitais.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paciente,
      PacienteEvento,
      Leito,
      Hospital,
      Evento,
      EventoTipo,
      HistoricoSinaisVitais
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
