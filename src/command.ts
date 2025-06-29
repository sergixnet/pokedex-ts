import { commandCatch } from './command_catch.js';
import { commandExit } from './command_exit.js';
import { commandExplore } from './command_explore.js';
import { commandHelp } from './command_help.js';
import { commandInspect } from './command_inspect.js';
import { commandMap } from './command_map.js';
import { commandMapB } from './command_mapb.js';
import { commandPokedex } from './command_pokedex.js';
import { CLICommand } from './state.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: 'map',
      description:
        'shows 20 location areas in Pokemon world. Subsequent calls, shows next 20 locations',
      callback: commandMap,
    },
    mapb: {
      name: 'mapb',
      description:
        'shows previous 20 location areas in Pokemon world. Subsequent calls, shows previous 20 locations',
      callback: commandMapB,
    },
    explore: {
      name: 'explore <location_name>',
      description: 'shows a list of pokemons from a given area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch <pokemon_name>',
      description: 'catches a pokemon from a given name',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect <pokemon_name>',
      description: 'inspects a pokemon data from a given name',
      callback: commandInspect,
    },
    pokedex: {
      name: 'pokedex',
      description: 'shows a list of pokemons on your pokedex',
      callback: commandPokedex,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
  };
}
