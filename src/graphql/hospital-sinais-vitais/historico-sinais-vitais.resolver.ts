import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import HistoricoSinaisVitais from "../../entities/historico-sinais-vitais.entity";
import Paciente from "../../entities/paciente.entity";

import RepoService from "../../repo/repo.service";

@Resolver(() => HistoricoSinaisVitais)
export class HistoricoSinaisVitaisResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [HistoricoSinaisVitais])
  public async listHistoricoSinaiVitais(): Promise<HistoricoSinaisVitais[]> {
    return this.repoService.historicoSinaisVitaisRepo.find();
  }

  @Query(() => HistoricoSinaisVitais)
  public async getHistoricoSinaiVitai(@Args('id') id: string): Promise<HistoricoSinaisVitais> {
    return this.repoService.historicoSinaisVitaisRepo.findOne(id);
  }

  @ResolveField()
  paciente(@Parent() historicoSinaisVitais: HistoricoSinaisVitais): Promise<Paciente> {
    return this.repoService.pacienteRepo.findOne(historicoSinaisVitais.pacienteId)
  }
}