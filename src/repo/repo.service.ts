import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Paciente from '../entities/paciente.entity';
import Leito from '../entities/leito.entity';
import Hospital from '../entities/hospital.entity';
import EventoTipo from '../entities/evento-tipo.entity';


@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Paciente) public readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Leito) public readonly leitoRepo: Repository<Leito>,
    @InjectRepository(Hospital) public readonly hospitalRepo: Repository<Hospital>,
    @InjectRepository(EventoTipo) public readonly eventoTipoRepo: Repository<EventoTipo>,
  ) {}
}

export default RepoService;