import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Evento from '../../entities/evento.entity';
import RepoService from '../../repo/repo.service';
import { PacienteEventoInput } from '../paciente-evento/paciente-evento.input';
import { InternacaoInput } from './inputs/internacao.input';
import { publishWsEvents } from "./constants/publish-events.constants"
import PacienteEvento from '../../entities/paciente-evento.entity';

@Resolver(() => Evento)
export class EventoResolver {
  constructor(
    private readonly repoService: RepoService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

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

  @Subscription(() => PacienteEvento)
  pacienteInternado() {
    return this.pubSub.asyncIterator(publishWsEvents.PACIENTE_INTERNADO)
  }
}
