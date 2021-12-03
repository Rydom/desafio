import { PubSub } from 'graphql-subscriptions';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Evento from '../../entities/evento.entity';
import Leito from '../../entities/leito.entity';
import PacienteEvento from '../../entities/paciente-evento.entity';
import Paciente from '../../entities/paciente.entity';
import RepoService from '../../repo/repo.service';
import { Inject } from '@nestjs/common';

@Resolver(() => PacienteEvento)
export class PacienteEventoResolver {
  constructor(
    private readonly repoService: RepoService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [PacienteEvento])
  public listPacienteEvento(): Promise<PacienteEvento[]> {
    return this.repoService.pacienteEventoRepo.find();
  }

  @Query(() => [PacienteEvento])
  public getPacienteEvento(@Args('id') id: string): Promise<PacienteEvento> {
    return this.repoService.pacienteEventoRepo.findOne(id);
  }

  @ResolveField()
  async paciente(@Parent() pacienteEvento: PacienteEvento): Promise<Paciente> {
    return this.repoService.pacienteRepo.findOne(pacienteEvento.pacienteId);
  }

  @ResolveField()
  async evento(@Parent() pacienteEvento: PacienteEvento): Promise<Evento> {
    return this.repoService.eventoRepo.findOne(pacienteEvento.eventoId);
  }
  @ResolveField()
  async leito(@Parent() pacienteEvento: PacienteEvento): Promise<Leito> {
    return this.repoService.leitoRepo.findOne(pacienteEvento.leitoId);
  }
}
