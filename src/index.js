import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './format.js';

const getFormat = (filePath) => path.extname(filePath).replace(/\./, '');

export default (pathOne, pathTwo, formatName = 'stylish') => {
  const formatFileOne = getFormat(pathOne);
  const formatFileTwo = getFormat(pathTwo);
  const data1 = parse(fs.readFileSync(path.resolve(`${pathOne}`)), formatFileOne);
  const data2 = parse(fs.readFileSync(path.resolve(`${pathTwo}`)), formatFileTwo);
  const tree = buildTree(data1, data2);
  return format(formatName, tree);
};
