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
    const { sinaisVitaisInput, pacienteEventoInput } = data;

    const pacienteEvento =
      this.repoService.pacienteEventoRepo.create(pacienteEventoInput);
    const historicoSinaisVitais =
      this.repoService.historicoSinaisVitaisRepo.create(sinaisVitaisInput);

    await this.repoService.pacienteEventoRepo.save(pacienteEvento);
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
  async coletarExamePaciente(
    @Args('data') pacienteEventoInput: PacienteEventoInput
  ): Promise<PacienteEvento> {
    // Hemograma e Glicemia em Jejum
    const pacienteEvento = this.repoService.pacienteEventoRepo.create(pacienteEventoInput)
    await this.repoService.pacienteEventoRepo.save(pacienteEvento);
    
    this.publishWebsocketEvent(
      publishWsEvents.COLETA_SINAIS_VITAIS,
      pacienteEvento,
    );

    return pacienteEvento;
  }

  @Mutation(() => PacienteEvento)
  async movimentarLeito(
    @Args('leitoAtual') leitoAtual: string,
    @Args('novoLeito') novoLeito: string,
    @Args('data') pacienteEventoInput: PacienteEventoInput,
  ): Promise<PacienteEvento> {
    //  Buscar paciente, Atualizar leito, criar evento.
    const { pacienteId } = pacienteEventoInput
    const paciente = await this.repoService.pacienteEventoRepo.findOne(pacienteId)

    const leitoAntigo = await this.repoService.leitoRepo.findOne(leitoAtual)
    // Desocupa o leito atual
    leitoAntigo.ocupado = false
    await this.repoService.leitoRepo.update(leitoAntigo.id, leitoAntigo)
    
    const atualizarLeito = await this.repoService.leitoRepo.findOne(novoLeito)

    paciente.leitoId = novoLeito

    await this.repoService.pacienteRepo.update(paciente.id, paciente)
    // Ocupa o novo leito
    atualizarLeito.ocupado = true
    await this.repoService.leitoRepo.update(atualizarLeito.id, atualizarLeito)

    const pacienteEvento = this.repoService.pacienteEventoRepo.create(pacienteEventoInput);
    pacienteEvento.leitoId = novoLeito;
    await this.repoService.pacienteEventoRepo.save(pacienteEvento)

    this.publishWebsocketEvent(
      publishWsEvents.MOVIMENTACAO_LEITO,
      pacienteEvento,
    );

    return pacienteEvento
  }

  @Mutation(() => PacienteEvento)
  async concederAltaPaciente(
    @Args('data') pacienteEventoInput: PacienteEventoInput
  ): Promise<PacienteEvento> {
    const pacienteEvento = this.repoService.pacienteEventoRepo.create(pacienteEventoInput)
    await this.repoService.pacienteEventoRepo.save(pacienteEvento);

    const paciente = await this.repoService.pacienteRepo.findOne(pacienteEventoInput.pacienteId)
    paciente.status = "Alta"
    paciente.leitoId = null
    await this.repoService.pacienteRepo.save(paciente)

    this.publishWebsocketEvent(
      publishWsEvents.ALTA_PACIENTE,
      pacienteEvento,
    );

    return pacienteEvento;
  }

  @Subscription(() => PacienteEvento)
  pacienteInternado() {
    return this.pubSub.asyncIterator(publishWsEvents.PACIENTE_INTERNADO);
  }

  @Subscription(() => HistoricoSinaisVitais)
  coletaSinaisVitais() {
    return this.pubSub.asyncIterator(publishWsEvents.COLETA_SINAIS_VITAIS);
  }

  @Subscription(() => PacienteEvento )
  movimentacaoLeito() {
    return this.pubSub.asyncIterator(publishWsEvents.MOVIMENTACAO_LEITO);
  }

  @Subscription(() => PacienteEvento )
  altaPaciente() {
    return this.pubSub.asyncIterator(publishWsEvents.ALTA_PACIENTE);
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
