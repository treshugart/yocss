export default function parse(obj) {
  return Object.keys(obj).map((selector) => {
    const rules = obj[selector];
    return `${selector}{${Object.keys(rules)
      .map(rule => {
        return `${rule}:${rules[rule]}`;
      })
      .join(';')}}`;
  });
}
