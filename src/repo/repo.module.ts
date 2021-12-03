import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import RepoService from './repo.service';
import Paciente from '../entities/paciente.entity';
import Leito from '../entities/leito.entity';
import Hospital from '../entities/hospital.entity';
import EventoTipo from '../entities/evento-tipo.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, Leito, Hospital, EventoTipo]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
