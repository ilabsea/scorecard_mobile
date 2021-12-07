export const getAttributesByColumns = (obj, columns) => {
  return Object.keys(obj)
    .filter(key => columns.indexOf(key) >= 0)
    .reduce((obj2, key) => Object.assign(obj2, { [key]: obj[key] }), {});
}