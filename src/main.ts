import { startREPL } from './repl.js';
import { initSate } from './state.js';

function main() {
  const state = initSate();
  startREPL(state);
}

main();
