export function cleanInput(input: string): string[] {
  return input.split(' ').filter((word) => word.length);
}
