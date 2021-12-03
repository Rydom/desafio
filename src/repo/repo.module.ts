import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import RepoService from './repo.service';
import Paciente from '../entities/paciente.entity';
import Leito from '../entities/leito.entity';
import Hospital from '../entities/hospital.entity';
import Exame from '../entities/exame.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, Leito, Hospital, Exame]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
