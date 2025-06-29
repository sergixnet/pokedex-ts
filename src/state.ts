import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';
import { type Interface } from 'readline';
import { getCommands } from './command.js';
import { PokeAPI } from './pokeapi.js';
import { Pokemon } from './pokeapi-types/locations.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initSate(cacheInterval: number): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });
  const commands = getCommands();

  return {
    rl,
    commands,
    pokeapi: new PokeAPI(cacheInterval),
    nextLocationURL: 'https://pokeapi.co/api/v2/location-area',
    prevLocationURL: null,
    pokedex: {},
  };
}
