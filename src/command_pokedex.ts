import { State } from './state';

export async function commandPokedex(state: State) {
  if (!Object.entries(state.caughtPokemon).length) {
    console.log('You have not any pokemon in your Pokedex.');
    console.log('You may want to catch some with the catch command');
    return;
  }

  console.log('Your Pokedex:');
  for (const [_, entry] of Object.entries(state.caughtPokemon)) {
    console.log(`  - ${entry.name}`);
  }
}
