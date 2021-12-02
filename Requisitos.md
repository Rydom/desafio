# # Teste prático! :rocket:

Você deve desenvolver uma (micro) API usando Node.js.

## Requisitos

- Construir uma API pública usando GraphQL (preferível) ou REST;
- Essa API deve ser capaz de receber diferentes tipos de eventos sobre Pacientes internados, oriundos de diferentes Hospitais. São eles:
	- Internação de um Paciente (em determinado Leito de determinado Hospital);
	- Coleta de sinais vitais de um Paciente (Pressão Arterial e Frequência Respiratória);
	- Coleta de exames de um Paciente (Hemograma e Glicemia em Jejum);
	- Movimentação de Leito de um Paciente (Do leito "X" para leito "Y");
	- Alta de um Paciente (em determinado Hospital e Leito);
- A API deve oferecer um único método para registro de cada tipo de evento listado acima, contemplando também o recebimento dos dados do Paciente (nome, data de nascimento e sexo);
- A API deve oferecer um único método para retornar todos os eventos recebidos de TODOS os Pacientes, ordenados do mais recente para o mais antigo, em real-time, via WebSockets ou Server-Sent Events;
- Após ingeridos e processados, TODOS os eventos recebidos devem ser enviados via Message Broker (SQS, SNS, RabbitMQ, Redis, etc) para serem persistidos por outra aplicação em uma base de dados (ou similar) durável;

## Avaliação

Nossa avaliação será focada no seguinte:

- Atendimento aos requisitos
- Organização e simplicidade do código
- Decisões de arquitetura e uso de boas práticas
- Testes automatizados
- Features adicionais que deseje implementar :P
- Limites de performance/escalabilidade da solução ao receber MUITOS eventos por segundo

### Extras

- Documentação da API (Swagger para REST ou auto-gerada se GraphQL)
- Live Queries e Spec do Relay (caso use GraphQL)
- Observabilidade (tracing, métricas, logs)
- CI/CD automatizado

## Prazo e Reposta

Tempo/esforço estimado: 8-12h*

Você deve nos responder com o link para um repositório público e nele devemos encontrar um arquivo README.md com todas as instruções para instalar e executar a sua aplicação, assim como qualquer outra informação que considere relevante para avaliarmos a sua entrega.