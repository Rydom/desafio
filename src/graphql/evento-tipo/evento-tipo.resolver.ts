import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import EventoTipo from "../../entities/evento-tipo.entity";
import RepoService from "../../repo/repo.service";
import { EventoTipoInput } from "./evento-tipo.input";

@Resolver(() => EventoTipo)
export class EventoTipoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [EventoTipo])
  public async listEventoTipo(): Promise<EventoTipo[]> {
    return this.repoService.eventoTipoRepo.find();
  }

  @Query(() => EventoTipo)
  public async getEventoTipo(@Args('id') id: string): Promise<EventoTipo> {
    return this.repoService.eventoTipoRepo.findOne(id);
  }

  @Mutation(() => EventoTipo)
  public async createEventoTipo(@Args('data') data: EventoTipoInput): Promise<EventoTipo> {
    const eventoTipo = this.repoService.eventoTipoRepo.create(data)
    await this.repoService.eventoTipoRepo.save(eventoTipo)
    return eventoTipo
  }
}