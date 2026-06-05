import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";

export class BoxService {
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): void {
    const jaExiste = this.pokemons.some((p) => p.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): PokemonResumo[] {
    return this.pokemons;
  }

  remover(id: number): void {
    const existe = this.pokemons.some((p) => p.id === id);

    if (!existe) {
      console.log(`[AVISO] Nenhum Pokémon encontrado com o ID ${id}.`);
      return;
    }

    this.pokemons = this.pokemons.filter((p) => p.id !== id);
    console.log(`[OK] Pokémon removido do catálogo.`);
  }

  buscarPorId(id: number): PokemonResumo | undefined {
    return this.pokemons.find((p) => p.id === id);
  }

  todosTipados(): boolean {
    return this.pokemons.every((p) => p.tipos.length > 0);
  }

  pesoTotal(): number {
    return this.pokemons.reduce((acc, p) => acc + p.peso, 0);
  }

  tamanho(): number {
    return this.pokemons.length;
  }

  vazio(): boolean {
    return this.pokemons.length === 0;
  }
}
