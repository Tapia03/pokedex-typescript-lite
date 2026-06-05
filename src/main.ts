import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  console.log("==========================================");
  console.log("       Pokédex TypeScript Lite");
  console.log("==========================================\n");

  const pokeApiService = new PokeApiService();
  const boxService = new BoxService();
  const controller = new TerminalController(boxService, pokeApiService);

  await controller.buscarEAdicionar("pikachu");
  await controller.buscarEAdicionar("charmander");
  await controller.buscarEAdicionar("bulbasaur");
  await controller.buscarEAdicionar("gengar");

  await controller.buscarEAdicionar("pokemon-inexistente");

  await controller.buscarEAdicionar("pikachu");

  controller.exibirCatalogo();

  controller.remover(25);

  controller.exibirCatalogo();

  controller.remover(999);
}

main();
