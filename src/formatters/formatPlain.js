import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

export default (tree) => {
  const iter = (treeNode, path) => {
    const result = treeNode.map((node) => {
      const {
        name, status, value, oldValue, newValue, children,
      } = node;
      const newPath = [path, name].flat();

      switch (status) {
        case 'hasChildren':
          return iter(children, newPath.join('.'));
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed':
          return `Property '${newPath.join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Wrong status ${status}`);
      }
    });
    return result.filter((string) => string !== null).join('\n');
  };

  return iter(tree, []);
};
