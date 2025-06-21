import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

export function cleanInput(input: string): string[] {
  return input.split(' ').filter((word) => word.length);
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (input) => {
    const command = cleanInput(input);

    if (command.length === 0) {
      rl.prompt();
    } else {
      console.log(`Your command was: ${command[0]}`);
      rl.prompt();
    }
  });
}
