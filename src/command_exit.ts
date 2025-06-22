import { CLICommand } from './command';

export function commandExit(command: Record<string, CLICommand>) {
  console.log('Closing the Pokedex... Goodbye!');
  process.exit(0);
}
