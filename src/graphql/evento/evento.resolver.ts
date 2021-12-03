import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Evento from '../../entities/evento.entity';
import RepoService from '../../repo/repo.service';
import { EventoInput } from './inputs/evento.input';
import EventoTipo from '../../entities/evento-tipo.entity';

@Resolver(() => Evento)
export class EventoResolver {
  constructor(
    private readonly repoService: RepoService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [Evento])
  public async listEventos(): Promise<Evento[]> {
    return this.repoService.eventoRepo.find();
  }

  @Query(() => Evento)
  public async getEvento(@Args('id') id: string): Promise<Evento> {
    return this.repoService.eventoRepo.findOne(id);
  }

  @Mutation(() => Evento)
  public async createEvento(
    @Args('data') eventoInput: EventoInput,
  ): Promise<Evento> {
    const evento = this.repoService.eventoRepo.create(eventoInput);
    await this.repoService.eventoRepo.save(evento);
    return evento;
  }

  @ResolveField()
  async eventoTipo(@Parent() evento: Evento): Promise<EventoTipo> {
    return this.repoService.eventoTipoRepo.findOne(evento.eventoTipoId);
  }
}
