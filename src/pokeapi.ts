import { Cache } from './pokecache.js';
import { ShallowLocations, Location } from './pokeapi-types/locations.js';
import { PokemonInfo } from './pokeapi-types/pokemon-info.js';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  #cache: Cache;

  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cachedLocations = this.#cache.get(url);

    if (cachedLocations) {
      return cachedLocations as ShallowLocations;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.status}`);
      }
      const locations: ShallowLocations = await response.json();
      this.#cache.add(url, locations);
      return locations;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const location = this.#cache.get(url);

    if (location) {
      return location as Location;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching location ${locationName}: ${response.status}`
        );
      }

      const location: Location = await response.json();
      return location;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

  async fetchPokemonInfo(name: string) {
    const url = `${PokeAPI.baseURL}/pokemon/${name}`;
    const pokemonInfo = this.#cache.get(url);

    if (pokemonInfo) {
      return pokemonInfo as PokemonInfo;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching pokemon info of ${name}: ${response.status}`
        );
      }

      const pokemon: PokemonInfo = await response.json();
      return pokemon;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }
}
