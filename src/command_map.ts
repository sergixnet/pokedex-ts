import { State } from './state';

export async function commandMap(state: State) {
  const pageURL = state.nextLocationURL ?? '';
  if (pageURL.indexOf('?') === -1) {
    console.log("you're on the first page");
  }
  const locations = await state.pokeapi.fetchLocations(pageURL);
  for (const location of locations.results) {
    console.log(location.name);
  }
  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;
}
