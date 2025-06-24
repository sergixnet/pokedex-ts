import { type Interface } from 'readline';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';
import { getCommands } from './command.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initSate(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });
  const commands = getCommands();

  return {
    rl,
    commands,
  };
}
