import pick from 'lodash/pick';

export const filterQueries = (object, picks) => {
  const jsonObj = {};
  const newObj = removeEmpty(object);
  Object.assign(
    jsonObj,
    pick(newObj, picks),
  );
  return jsonObj;
};

export const removeEmpty = obj => {
  Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
  return obj;
};
