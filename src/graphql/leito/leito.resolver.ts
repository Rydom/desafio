import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import Leito from "../../entities/leito.entity";
import RepoService from "../../repo/repo.service";
import { LeitoInput } from "./leito.input";

@Resolver(() => Leito)
export class LeitoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Leito])
  public listLeitos(): Promise<Leito[]> {
    return this.repoService.leitoRepo.find()
  }

  @Query(() => [Leito])
  public getLeito(@Args('id') id: string): Promise<Leito> {
    return this.repoService.leitoRepo.findOne(id);
  }
  
  @Mutation(() => Leito)
  public async createLeito(@Args('data') leitoInput: LeitoInput): Promise<Leito> {
    const leito = this.repoService.leitoRepo.create(leitoInput)
    await this.repoService.leitoRepo.save(leito)
    return leito
  }
}