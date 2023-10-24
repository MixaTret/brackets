module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const configMap = new Map(bracketsConfig.map(([open, close]) => [close, open]));
  const sameBrackets = new Set(bracketsConfig.map(([open, close]) => open === close ? open : ''));

  for (const char of str) {
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (configMap.has(char)) {
      const lastOpenBracket = stack.pop();
      if (lastOpenBracket !== configMap.get(char)) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}