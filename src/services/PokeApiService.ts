import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    const url = `${BASE_URL}/${nomeOuId.toLowerCase().trim()}`;

    try {
      const resposta = await fetch(url);

      if (!resposta.ok) {
        if (resposta.status === 404) {
          console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
          return null;
        }
        throw new APIError(`Erro na API: status ${resposta.status}`);
      }

      const dados = (await resposta.json()) as PokemonApiResponse;

      return this.mapearPokemon(dados);
    } catch (erro) {
      if (erro instanceof APIError) {
        console.log(`[ERRO] ${erro.message}`);
      } else {
        console.log(`[ERRO] Não foi possível buscar o Pokémon: ${nomeOuId}`);
      }
      return null;
    }
  }

  private mapearPokemon(dados: PokemonApiResponse): PokemonResumo {
    const tipos = dados.types.map((item) => item.type.name);

    const hp = dados.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;
    const ataque = dados.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
    const defesa = dados.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0;

    return {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
      hp,
      ataque,
      defesa,
    };
  }
}
