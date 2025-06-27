import { Cache } from './pokecache.js';

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
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export interface Location {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: ShallowLocation;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface ShallowLocation {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}
