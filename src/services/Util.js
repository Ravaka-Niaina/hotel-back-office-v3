export const formatDate = (date) => {
  const allTime = date.split('/');
  const format = [];
  format.push(allTime[2]);
  format.push(allTime[0]);
  format.push(allTime[1]);
  return format.map((e) => e).join('-');
};
export const dateIHMFormat = (date) => {
  const d = new Date(date.getTime());
  return d.toString().split(' ').filter((e, j) => j < 3).join(' ');
}
