import _ from 'lodash';

const treeBulder = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: secondValue };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'deleted', value: firstValue };
    }
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        name: key, status: 'hasChildren', children: treeBulder(firstValue, secondValue),
      };
    }
    if (firstValue !== secondValue) {
      return {
        name: key, status: 'changed', oldValue: firstValue, newValue: secondValue,
      };
    }
    return { name: key, status: 'unchanged', value: firstValue };
  });
};

export default treeBulder;
