import union from "../../node_modules/lodash-es/union.js"
import sortBy from "../../node_modules/lodash-es/sortBy.js"
import isPlainObject from "../../node_modules/lodash-es/isPlainObject.js"
import isEqual from "../../node_modules/lodash-es/isEqual.js"
import f from "../../node_modules/lodash-es/union.js"


const spacesCount = 4;
const replacer = ' ';

const getTwoOrSixSpaces = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - 2);
};

const getFourOrEightSpaces = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const stringify = (data, depth) => {
  if (!isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getFourOrEightSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getFourOrEightSpaces(depth)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getTwoOrSixSpaces(depth)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getTwoOrSixSpaces(depth)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getTwoOrSixSpaces(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getTwoOrSixSpaces(depth)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getFourOrEightSpaces(depth)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getFourOrEightSpaces(depth)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getFourOrEightSpaces(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});
function getTree(data1, data2) {
    const files = sortBy(union(Object.keys(data1), Object.keys(data2)));
  
    const result = files.map((key) => {
      if (!Object.hasOwn(data2, key)) {
        return {
          key,
          type: 'deleted',
          value: data1[key],
        };
      }
      if (!Object.hasOwn(data1, key)) {
        return {
          key,
          type: 'added',
          value: data2[key],
        };
      }
      if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
        return {
          key,
          children: getTree(data1[key], data2[key]),
          type: 'nested',
        };
      }
      if (!isEqual(data1[key], data2[key])) {
        return {
          key,
          type: 'changed',
          value1: data1[key],
          value2: data2[key],
        };
      }
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    });
  
    return result;
  }

const stylishFormat = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};


export default (before = "", after = "") => stylishFormat(getTree(before,after))

