# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end simples desenvolvida em Node.js com TypeScript que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/) e organiza os resultados em um catálogo local durante a execução do programa.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js e JavaScript no back-end
- TypeScript: interfaces, tipos, classes, modificadores de acesso
- Funções tipadas com `async/await` e `Promises`
- Arrays e métodos de array (`map`, `filter`, `find`, `some`, `every`, `reduce`)
- Consumo de API externa com `fetch` e tratamento de erros com `try/catch`
- Organização modular em camadas (controllers, services, models, utils)
- GitHub e GitFlow

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- PokeAPI (`https://pokeapi.co/`)
- Git / GitHub

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/pokedex-typescript-lite.git
```

Acesse a pasta do projeto:

```bash
cd pokedex-typescript-lite
```

Instale as dependências:

```bash
npm install
```

## Como executar

```bash
npm run dev
```

ou

```bash
npm start
```

## Estrutura do projeto

```
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts                        # Ponto de entrada: instancia serviços e demonstra o fluxo
│   │
│   ├── controllers/
│   │   └── TerminalController.ts      # Camada de interface: orquestra exibição no terminal
│   │
│   ├── services/
│   │   ├── PokeApiService.ts          # Integração externa: fetch + async/await + mapeamento
│   │   └── BoxService.ts              # Persistência local: catálogo em memória com regras
│   │
│   ├── models/
│   │   ├── Pokemon.ts                 # Interfaces PokemonResumo e PokemonApiResponse
│   │   └── CustomErrors.ts            # Classes de erro customizadas (APIError, LocalBoxError)
│   │
│   └── utils/
│       └── textFormatters.ts          # Funções puras utilitárias de formatação
│
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades

- Buscar Pokémon por nome ou ID via PokeAPI
- Tratar erro de Pokémon inexistente sem quebrar a aplicação
- Mapear resposta da API para objeto simplificado (`PokemonResumo`)
- Adicionar Pokémon ao catálogo local
- Impedir duplicidade pelo ID
- Listar todos os Pokémon do catálogo
- Remover Pokémon por ID
- Exibir mensagens claras no terminal

## Exemplos de execução

### Busca válida

**Entrada testada:** `pikachu`

```
>> Buscando: pikachu...
[OK] Pokémon encontrado: Pikachu
[OK] pikachu adicionado ao catálogo.
```

**Saída na listagem:**

```
#25 - pikachu
  Tipos  : electric
  Altura : 4 dm
  Peso   : 60 hg
  HP     : 35 | Ataque: 55 | Defesa: 40
```

---

### Busca inválida

**Entrada testada:** `pokemon-inexistente`

```
>> Buscando: pokemon-inexistente...
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Duplicidade

**Entrada testada:** adicionar `pikachu` duas vezes

```
>> Buscando: pikachu...
[OK] Pokémon encontrado: Pikachu
[AVISO] pikachu já está no catálogo.
```

---

### Remoção

**Entrada testada:** remover ID 25 (pikachu)

```
>> Removendo Pokémon com ID 25...
[OK] Pokémon removido do catálogo.
```

**Tentativa de remover ID inexistente:**

```
>> Removendo Pokémon com ID 999...
[AVISO] Nenhum Pokémon encontrado com o ID 999.
```

---

### Listagem completa

```
========== CATÁLOGO ATUAL ==========
#4 - charmander
  Tipos  : fire
  Altura : 6 dm
  Peso   : 85 hg
  HP     : 39 | Ataque: 52 | Defesa: 43

#1 - bulbasaur
  Tipos  : grass, poison
  Altura : 7 dm
  Peso   : 69 hg
  HP     : 45 | Ataque: 49 | Defesa: 49

#94 - gengar
  Tipos  : ghost, poison
  Altura : 15 dm
  Peso   : 405 hg
  HP     : 60 | Ataque: 65 | Defesa: 60

Total: 3 Pokémon(s)
Peso total acumulado: 559 hg
Todos tipados corretamente: Sim
=====================================
```

## Conceitos aplicados

### TypeScript
Todos os arquivos são `.ts`. Parâmetros, retornos e atributos são explicitamente tipados. O `tsconfig.json` usa `"strict": true`, que habilita verificações rigorosas como `noImplicitAny` e `strictNullChecks`.

### Interfaces
- `PokemonResumo`: representa os dados simplificados do Pokémon usados internamente.
- `PokemonApiResponse`: mapeia apenas os campos relevantes do retorno da PokeAPI.

### Fetch e async/await
`PokeApiService.buscarPokemon()` usa `fetch` nativo do Node.js (v18+) com `async/await` para consultar a API de forma assíncrona.

### Tratamento de erros
`try/catch` no `PokeApiService`: status 404 exibe mensagem amigável; outros erros lançam `APIError`. O programa nunca quebra por falha na API.

### Métodos de array utilizados

| Método | Onde | Finalidade |
|--------|------|------------|
| `map` | `PokeApiService` | Transforma `types` da API em `string[]` |
| `find` | `PokeApiService` | Localiza HP, ataque e defesa nos stats |
| `some` | `BoxService` | Verifica duplicidade e existência por ID |
| `filter` | `BoxService` | Remove Pokémon pelo ID |
| `every` | `BoxService` | Valida que todos têm tipos definidos |
| `reduce` | `BoxService` | Calcula o peso total do catálogo |

### Classe BoxService
Gerencia o catálogo com atributo `private pokemons: PokemonResumo[]` e métodos `adicionar`, `listar`, `remover`, `buscarPorId`, `todosTipados`, `pesoTotal`.

## Organização do Kanban

| Backlog | A Fazer | Em Andamento | Concluído |
|---------|---------|--------------|-----------|
| — | — | — | Criar repositório |
| — | — | — | Configurar Node + TypeScript |
| — | — | — | Criar package.json e tsconfig |
| — | — | — | Criar interfaces Pokemon.ts |
| — | — | — | Criar CustomErrors.ts |
| — | — | — | Criar PokeApiService |
| — | — | — | Criar BoxService |
| — | — | — | Criar TerminalController |
| — | — | — | Criar main.ts com fluxo completo |
| — | — | — | Criar utils/textFormatters |
| — | — | — | Atualizar README |

**Link do Kanban:** _([cole aqui o link do seu Trello/Notion/GitHub Projects](https://trello.com/invite/b/6a22d809bffcd73fb1a7123c/ATTIac87998cf1676bacd1c75b9b28f93abb946AEA1A/pokedex-typescript-lite-rodrigo-tapia))_

## Branches utilizadas

- `main` — versão estável
- `develop` — integração de funcionalidades
- `feat/pokedex` — implementação do código-fonte
- `docs/readme` — documentação

## Melhorias futuras

- Menu interativo no terminal com `readline`
- Persistência do catálogo em `pc_box.json` com `fs/promises`
- Filtros por tipo de Pokémon
- Criar API própria com Express
