import { Module } from "@nestjs/common";
import { PubSubModule } from "./pubsub.module";


@Module({
  imports: [PubSubModule],
  providers: [],
  exports: []
})
export class GQLImportsModule {}