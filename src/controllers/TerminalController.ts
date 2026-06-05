import { BoxService } from "../services/BoxService";
import { PokeApiService } from "../services/PokeApiService";
import { formatarLista, capitalizar } from "../utils/textFormatters";

export class TerminalController {
  private boxService: BoxService;
  private pokeApiService: PokeApiService;

  constructor(boxService: BoxService, pokeApiService: PokeApiService) {
    this.boxService = boxService;
    this.pokeApiService = pokeApiService;
  }

  async buscarEAdicionar(nomeOuId: string): Promise<void> {
    console.log(`\n>> Buscando: ${nomeOuId}...`);
    const pokemon = await this.pokeApiService.buscarPokemon(nomeOuId);
    if (pokemon !== null) {
      console.log(`[OK] Pokémon encontrado: ${capitalizar(pokemon.nome)}`);
      this.boxService.adicionar(pokemon);
    }
  }

  exibirCatalogo(): void {
    console.log("\n========== CATÁLOGO ATUAL ==========");
    if (this.boxService.vazio()) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    const lista = this.boxService.listar();
    console.log(formatarLista(lista));
    console.log(`\nTotal: ${this.boxService.tamanho()} Pokémon(s)`);
    console.log(`Peso total acumulado: ${this.boxService.pesoTotal()} hg`);
    console.log(`Todos tipados corretamente: ${this.boxService.todosTipados() ? "Sim" : "Não"}`);
    console.log("=====================================");
  }

  remover(id: number): void {
    console.log(`\n>> Removendo Pokémon com ID ${id}...`);
    this.boxService.remover(id);
  }
}
