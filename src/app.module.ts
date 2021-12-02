import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './config/typeorm';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { GQLImportsModule } from './graphql/graphq-imports.module';
import { GraphQLModule } from '@nestjs/graphql';


@Module({
  imports: [
      TypeOrmModule.forRoot(ormOptions),
      RepoModule,
      GQLImportsModule,
      GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
        debug: false,
        playground: true,
        installSubscriptionHandlers: true,
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
