import _ from 'lodash';

const getIndent = (n) => ' '.repeat(n);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const result = Object.keys(value).map((key) => {
    if (_.isObject(value[key])) {
      return `${getIndent(depth + 8)}${key}: ${stringify(value[key], depth + 4)}`;
    }
    return `${getIndent(depth + 8)}${key}: ${value[key]}`;
  });

  return ['{', ...result, `${getIndent(depth + 4)}}`].join('\n');
};

export default (tree) => {
  const iter = (treeNode, depth) => {
    const result = treeNode.map((node) => {
      const {
        name, status, value, oldValue, newValue, children,
      } = node;

      switch (status) {
        case 'added':
          return `${getIndent(depth + 2)}+ ${name}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getIndent(depth + 2)}- ${name}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getIndent(depth + 2)}  ${name}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getIndent(depth + 2)}- ${name}: ${stringify(oldValue, depth)}\n${getIndent(depth + 2)}+ ${name}: ${stringify(newValue, depth)}`;
        case 'hasChildren':
          return `${getIndent(depth + 2)}  ${name}: ${iter(children, depth + 4)}`;
        default:
          throw new Error(`Wrong status ${status}.`);
      }
    });

    return ['{', ...result, `${getIndent(depth)}}`].join('\n');
  };

  return iter(tree, 0);
};
