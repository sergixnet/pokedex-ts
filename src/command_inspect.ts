import { PokemonInfo } from './pokeapi-types/pokemon-info';
import { State } from './state';

function printPokemon(pokemonInfo: PokemonInfo) {
  const { name, height, weight, stats, types } = pokemonInfo;

  console.log(`Name: ${name}`);
  console.log(`Height: ${height}`);
  console.log(`Weight: ${weight}`);

  console.log(`Stats:`);
  for (const stat of stats) {
    const name = stat.stat.name;
    const num = stat.base_stat;
    console.log(`  - ${name}: ${num}`);
  }

  console.log(`Types:`);
  for (const type of types) {
    console.log(`  - ${type.type.name}`);
  }
}

export async function commandInspect(state: State, ...args: string[]) {
  const [name, ...other] = args;

  if (!name || other.length) {
    console.log('Usage: inspect <pokemon_name>');
    return;
  }

  if (!(name in state.caughtPokemon)) {
    console.log('you have not caught that pokemon');
    return;
  }

  const pokemon = await state.pokeapi.fetchPokemonInfo(name);

  printPokemon(pokemon);
}
