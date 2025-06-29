import { PokeAPI } from './pokeapi';
import { State } from './state';

function tryToCatchPokemon(experience: number) {
  let dificulty = experience / 300;

  if (dificulty > 1) {
    dificulty = 1;
  }

  const chance = 1 - dificulty;
  const dice = Math.random();

  return dice < chance;
}

export async function commandCatch(state: State, ...args: string[]) {
  const [name, ...other] = args;

  if (!name || other.length) {
    console.log('Usage: catch <pokemon_name>');
    return;
  }

  console.log(`Throwing a Pokeball at ${name}...`);

  const pokemonInfo = await state.pokeapi.fetchPokemonInfo(name);

  const experience = pokemonInfo.base_experience;

  if (tryToCatchPokemon(experience)) {
    state.caughtPokemon[name] = {
      name,
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    };
    console.log(`${name} was caught!`);
  } else {
    console.log(`${name} escaped!`);
  }
}
