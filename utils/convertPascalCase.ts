export const convertPascalCase = (string: string) =>
  string.replace(
    /(\w+)/g,
    (arr) => arr[0].toUpperCase() + arr.slice(1).toLowerCase()
  );
