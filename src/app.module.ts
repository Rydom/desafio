import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './config/typeorm';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { GQLImportsModule } from './graphql/graphq-imports.module';
import { GraphQLModule } from '@nestjs/graphql';
import { sexoRoleResolver } from './graphql/paciente/sexo-role.resolver';


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
        resolvers: {
          SexoRole: sexoRoleResolver
        }
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
