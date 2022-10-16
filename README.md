# Teste Técnico para empresa Stone

# Visão geral

Este serviço é uma api de em node focado na gestão e regras de negócio relacionados a entidade de cliente.

## desenho da arquitetura

[Clique aqui](./docs/architecture.md) para ver

# Como executar esse projeto

## Variáveis ​​ambientais
<blockquote>
REDIS_URL=

PORT=

BASE_URL=
GRANT_TYPE=
CLIENT_ID=
CLIENT_SECRET=

</blockquote>

#### Observação: as variaveis de ambiente (BASE_URL, GRANT_TYPE, CLIENT_ID, CLIENT_SECRET) devem ser preenchidas baseado no json que é gerado pelo keycloak
## Instalação

Para executar o projeto, você precisará de [NPM](https://www.npmjs.com/) ou [YARN](https://yarnpkg.com/) e [node.js](https://nodejs.org/en/) (a versão é especificada em [Dockerfile](Dockerfile)). Todas as dependências do projeto serão adicionadas automaticamente executando o comando install:

Primeiro, instale as dependências da aplicação:

```  bash
yarn install
```

## Executar

- To run for development:

execute **docker-compose up -d redis** para fornecer dependência redis

Configure seu arquivo .env e execute o comando abaixo:
<blockquote>

exemplo de .env
REDIS_URL=redis:6379
PORT=3000
BASE_URL=
GRANT_TYPE=
CLIENT_ID=
CLIENT_SECRET=

</blockquote>

```  bash
yarn dev
```

- Para executar para desenvolvimento usando docker-compose:

Configure seu arquivo .env e execute o comando abaixo:
<blockquote>

exemplo de .env
REDIS_URL=redis:6379
PORT=3000
BASE_URL=
GRANT_TYPE=
CLIENT_ID=
CLIENT_SECRET=

</blockquote>

``` bash
yarn up
```
Para desligar o servidor basta executar o comando abaixo:

``` bash
yarn down
```

Nota: se você estiver executando localmente para acessar o serviço, será necessário usar o endereço IP da máquina:

You can find this information running this command on linux:

```
ip addr show | grep -Po 'inet \K[\d.]+'
```

O servidor iniciará em http://127.0.0.1:3000/healthcheck


- Para executar em "produção":

```
yarn build
yarn start
```
