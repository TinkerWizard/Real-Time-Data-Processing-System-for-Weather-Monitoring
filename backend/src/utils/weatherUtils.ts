interface ConditionCounts {
  [key: string]: number;
}

export const calculateDominantCondition = (
  conditionCounts: ConditionCounts
): string => {
  return Object.keys(conditionCounts).reduce((a, b) =>
    conditionCounts[a] > conditionCounts[b] ? a : b
  );
};
