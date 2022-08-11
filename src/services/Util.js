export const formatDate = (date) => {
  const allTime = date.split('/');
  const format = [];
  format.push(allTime[2]);
  format.push(allTime[0]);
  format.push(allTime[1]);
  return format.map((e) => e).join('-');
};
