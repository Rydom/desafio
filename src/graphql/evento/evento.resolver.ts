import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Evento from '../../entities/evento.entity';
import RepoService from '../../repo/repo.service';
import { PacienteEventoInput } from '../paciente-evento/paciente-evento.input';
import { InternacaoInput } from './inputs/internacao.input';
import { publishWsEvents } from "./constants/publish-events.constants"
import PacienteEvento from '../../entities/paciente-evento.entity';
import HistoricoSinaisVitais from '../../entities/historico-sinais-vitais.entity';
import { SinaisVitaisInput } from '../hospital-sinais-vitais/historico-sinais-vitais.input';
import { EventoInput } from './inputs/evento.input';

@Resolver(() => Evento)
export class EventoResolver {
  constructor(
    private readonly repoService: RepoService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Evento)
  public async createEvento(@Args('data') eventoInput: EventoInput): Promise<Evento> {
    const evento = this.repoService.eventoRepo.create(eventoInput)
    await this.repoService.eventoRepo.save(evento)
    return evento
  }

  @Mutation(() => PacienteEvento)
  public async internarPaciente(
    @Args('data') internacaoInput: InternacaoInput,
  ): Promise<PacienteEvento> {
    // Internar
    const { pacienteInput, eventoInput, leitoId } = internacaoInput;

    const paciente = this.repoService.pacienteRepo.create(pacienteInput);
    const evento = this.repoService.eventoRepo.create(eventoInput);

    await this.repoService.pacienteRepo.save(paciente);
    await this.repoService.eventoRepo.save(evento);

    const pacienteEventoInput: PacienteEventoInput = {
      eventoId: evento.id,
      pacienteId: paciente.id,
      leitoId: leitoId,
    };
    const pacienteEvento =
      this.repoService.pacienteEventoRepo.create(pacienteEventoInput);
    await this.repoService.pacienteEventoRepo.save(pacienteEvento);
    
    // this.publishWebsocketEvent('pacienteInternado', pacienteEvento)
    this.publishWebsocketEvent(publishWsEvents.PACIENTE_INTERNADO, pacienteEvento)

    return pacienteEvento;
  }

  public publishWebsocketEvent(publishEventName: string, payload: any) {
      this.pubSub.publish(publishEventName, { [publishEventName]: payload });
  }

  @Mutation(() => HistoricoSinaisVitais)
  public async coletarSinaisVitais(@Args('data') sinais: SinaisVitaisInput): Promise<HistoricoSinaisVitais> {
    
    const historicoSinaisVitais = this.repoService.historicoSinaisVitaisRepo.create(sinais)
    await this.repoService.historicoSinaisVitaisRepo.save(historicoSinaisVitais)

    this.publishWebsocketEvent(publishWsEvents.COLETA_SINAIS_VITAIS, historicoSinaisVitais)

    return historicoSinaisVitais
  }

  @Mutation(() => PacienteEvento)
  movimentarLeito(leitoAtual: string, novoLeito: string): Promise<PacienteEvento> {
    // atualizar paciente
    return 
  }

  @Subscription(() => PacienteEvento)
  pacienteInternado() {
    return this.pubSub.asyncIterator(publishWsEvents.PACIENTE_INTERNADO)
  }

  @Subscription(() => HistoricoSinaisVitais)
  coletaSinaisVitais() {
    return this.pubSub.asyncIterator(publishWsEvents.COLETA_SINAIS_VITAIS)
  }
}
