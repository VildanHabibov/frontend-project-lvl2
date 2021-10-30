#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  // .option('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((pathOne, pathTwo) => {
    const { format } = program;
    const diff = genDiff(pathOne, pathTwo, format);
    console.log(diff);
  });
program.parse(process.argv);
