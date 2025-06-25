import { State } from './state';

export async function commandMapB(state: State) {
  const pageURL = state.prevLocationURL ?? '';
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
