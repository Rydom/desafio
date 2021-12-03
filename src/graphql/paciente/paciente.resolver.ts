import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import Paciente from "../../entities/paciente.entity";
import RepoService from "../../repo/repo.service";
import { PacienteInput } from "./paciente.input";

@Resolver(() => Paciente)
export class PacienteResolver {
  constructor(
    private readonly repoService: RepoService) {}

  @Query(() => [Paciente])
  public async listPacientes(): Promise<Paciente[]> {
    return this.repoService.pacienteRepo.find();
  }

  @Query(() => Paciente)
  public async getPaciente(@Args('id') id: string): Promise<Paciente> {
    return this.repoService.pacienteRepo.findOne(id);
  }

  @Mutation(() => Paciente)
  public async createPaciente(@Args('data') data: PacienteInput): Promise<Paciente> {
    const existsPaciente = await this.repoService.pacienteRepo.findOne({ cpf: data.cpf })
    
    if (existsPaciente) {
      throw new Error('CPF already exists.')
    }
    
    const paciente = this.repoService.pacienteRepo.create(data);
    await this.repoService.pacienteRepo.save(paciente);
    return paciente;

  }

  @Mutation(() => Paciente)
  public async updatePaciente(
    @Args('id') id: string,
    @Args('data') payload: PacienteInput,
  ) {
    let paciente: Promise<Paciente>;
    const pacienteUpdated = await this.repoService.pacienteRepo.update(id, {
      ...payload,
      id,
    });
    if (pacienteUpdated) {
      paciente = this.repoService.pacienteRepo.findOne(id);
    }
    return paciente;
  }

  @Mutation(() => Boolean)
  public async deletePaciente(@Args('id') id: string): Promise<boolean> {
    return !!(await this.repoService.pacienteRepo.delete(id));
  }
}