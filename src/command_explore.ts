import { State } from './state';

export async function commandExplore(state: State, ...args: string[]) {
  const [location, ...other] = args;

  if (!location || other.length) {
    console.log('Usage: explore <location_name>');
    return;
  }

  console.log(`Exploring ${location}...`);

  const locationData = await state.pokeapi.fetchLocation(location);

  console.log('Found Pokemon:');

  locationData.pokemon_encounters.forEach((location) => {
    console.log(`- ${location.pokemon.name}`);
  });
}
