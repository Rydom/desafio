import { PubSub } from 'graphql-subscriptions';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import Evento from '../../entities/evento.entity';
import Leito from '../../entities/leito.entity';
import PacienteEvento from '../../entities/paciente-evento.entity';
import Paciente from '../../entities/paciente.entity';
import RepoService from '../../repo/repo.service';
import { Inject } from '@nestjs/common';
import { publishWsEvents } from '../evento/constants/publish-events.constants';
import HistoricoSinaisVitais from '../../entities/historico-sinais-vitais.entity';
import { HistoricoSinaisVitaisInput } from '../hospital-sinais-vitais/inputs/historico-sinais-vitais.input';
import { PacienteEventoInput } from './paciente-evento.input';

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

  @Mutation(() => PacienteEvento)
  public async internarPaciente(
    @Args('data') pacienteEventoInput: PacienteEventoInput,
  ): Promise<PacienteEvento> {
    const pacienteEvento =
      this.repoService.pacienteEventoRepo.create(pacienteEventoInput);
    await this.repoService.pacienteEventoRepo.save(pacienteEvento);

    this.publishWebsocketEvent(
      publishWsEvents.PACIENTE_INTERNADO,
      pacienteEvento,
    );

    return pacienteEvento;
  }

  @Mutation(() => HistoricoSinaisVitais)
  public async coletarSinaisVitais(
    @Args('data') data: HistoricoSinaisVitaisInput,
  ): Promise<HistoricoSinaisVitais> {
    const { sinaisVitaisInput, pacienteEventoInput } = data

    const pacienteEvento = this.repoService.pacienteEventoRepo.create(pacienteEventoInput)
    const historicoSinaisVitais =
      this.repoService.historicoSinaisVitaisRepo.create(sinaisVitaisInput);
    
    await this.repoService.pacienteEventoRepo.save(pacienteEvento)
    await this.repoService.historicoSinaisVitaisRepo.save(
      historicoSinaisVitais,
    );

    this.publishWebsocketEvent(
      publishWsEvents.COLETA_SINAIS_VITAIS,
      historicoSinaisVitais,
    );

    return historicoSinaisVitais;
  }

  @Mutation(() => PacienteEvento)
  movimentarLeito(
    leitoAtual: string,
    novoLeito: string,
  ): Promise<PacienteEvento> {
    // atualizar paciente
    return;
  }

  @Subscription(() => PacienteEvento)
  pacienteInternado() {
    return this.pubSub.asyncIterator(publishWsEvents.PACIENTE_INTERNADO);
  }

  @Subscription(() => HistoricoSinaisVitais)
  coletaSinaisVitais() {
    return this.pubSub.asyncIterator(publishWsEvents.COLETA_SINAIS_VITAIS);
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

  public publishWebsocketEvent(publishEventName: string, payload: any) {
    this.pubSub.publish(publishEventName, { [publishEventName]: payload });
  }
}
