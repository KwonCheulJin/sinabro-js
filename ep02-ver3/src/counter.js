import { bindReactiveState } from './reactivity';

export function setUpCounter() {
  const [getCountMap, setCountMap] = bindReactiveState({
    name: 'countMap',
    defaultValue: {},
  });

  const increase = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined || newCountMap[productId] <= 0) {
      newCountMap[productId] = 0;
    }
    newCountMap[productId] += 1;
    setCountMap(newCountMap);
    return newCountMap[productId];
  };

  const decrease = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined || newCountMap[productId] < 1) {
      newCountMap[productId] = 0;
    } else {
      newCountMap[productId] -= 1;
    }
    setCountMap(newCountMap);
    return newCountMap[productId];
  };

  const getTotalCount = () => {
    return Object.values(getCountMap()).reduce((acc, cur) => acc + cur, 0);
  };

  const getCountByProductId = ({ productId }) => {
    return getCountMap()[productId] || 0;
  };

  return {
    increase,
    decrease,
    getTotalCount,
    getCountByProductId,
  };
}
