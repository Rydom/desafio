
## Introdução

Este projeto é uma API pública de gerenciamento de eventos hospitalares, utilizando NodeJs e GraphQL. 

A API tem como objetivo, receber eventos sobre pacientes de diversos hospitais, registrar estes eventos e retornar todos os eventos de cada paciente ordenados de forma cronologica, do mais antigo para o mais recente, em real-time, utilizando WebSockets.

Após o processamento inicial, os eventos são enviados via MessageBroker (RabbitMQ), para ser persistido por uma aplicação terceira em um banco de dados dúravel.



## Tecnologias utilizadas

**Server:** Node, GraphQL, WebSockets

**Data Base:** PostgresSql

**Message Broker:** RabbitMq


## Ferramentas

Ferramentas utilizadas para ajudar a rodar o projeto com mais facilidade.

- Docker Compose


## Configuração

Antes de rodar o projeto é necessário configurar algumas ferramentas.

Caso não tenha o banco de dados PostgreSQL, execute os seguintes comandos.

```bash
  docker-compose pull
```

```bash
  docker-compose up
```
    
## Como rodar o projeto

Clone o projeto

```bash
  git clone https://github.com/rydom/desafio
```

Vá para o diretório do projeto

```bash
  cd desafio
```

Instale as dependências

```bash
  npm install
```

Inicie a aplicação

```bash
  npm run start
```


## Variáveis de ambiente

Para rodar esse projeto, é necessário adicionar as seguintes variáveis de ambientes ao seu arquivo .env

`DB_HOST`

`DB_PORT`

`DB_DATABASE`

`DB_USERNAME`

`DB_PASSWORD`

`PORT`




## Testes

Para rodar os testes é necessário usar o seguinte comando:

```bash
  npm run test
```


## Documentação

Caso você já tenha iniciado a aplicação, clique no link abaixo para acessar a documentação GraphQL

[Como utilizar as rotas](http://localhost:3000/graphql)


## Autor

- [@ramonOliveira](https://github.com/Rydom)








