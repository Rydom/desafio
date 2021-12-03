import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import Hospital from "../../entities/hospital.entity";
import RepoService from "../../repo/repo.service";
import { HospitalInput } from "./hospital.input";

@Resolver(() => Hospital)
export class HospitalResolver {
  constructor(private readonly repoService: RepoService) {}
  
  @Query(() => [Hospital])
  public async listHospitais(): Promise<Hospital[]> {
    return this.repoService.hospitalRepo.find();
  }

  @Query(() => Hospital)
  public async getHospital(@Args('id') id: string): Promise<Hospital> {
    return this.repoService.hospitalRepo.findOne(id);
  }

  @Mutation(() => Hospital)
  public async createHospital(@Args('data') hospitalInput: HospitalInput): Promise<Hospital> {
    const hospital = this.repoService.hospitalRepo.create(hospitalInput)
    await this.repoService.hospitalRepo.save(hospital)
    return hospital
  }
}