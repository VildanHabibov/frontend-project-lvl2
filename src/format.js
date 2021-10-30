import formatStylish from './formatters/formatStylish.js';
import formatPlain from './formatters/formatPlain.js';

export default (format, tree) => {
  switch (format) {
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return formatPlain(tree);
    case 'stylish':
      return formatStylish(tree);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};
