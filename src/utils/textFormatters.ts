import { PokemonResumo } from "../models/Pokemon";

export function formatarPokemon(pokemon: PokemonResumo): string {
  return (
    `#${pokemon.id} - ${pokemon.nome}\n` +
    `  Tipos  : ${pokemon.tipos.join(", ")}\n` +
    `  Altura : ${pokemon.altura} dm\n` +
    `  Peso   : ${pokemon.peso} hg\n` +
    `  HP     : ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`
  );
}

export function formatarLista(pokemons: PokemonResumo[]): string {
  return pokemons.map(formatarPokemon).join("\n\n");
}

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
