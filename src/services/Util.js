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
export const days = [
  {
    "value": 1,
    "checked": true,
    "label": "Mon"
  },
  {
    "value": 2,
    "checked": true,
    "label": "Tue"
  },
  {
    "value": 3,
    "checked": true,
    "label": "Wed"
  },
  {
    "value": 4,
    "checked": true,
    "label": "Thu"
  },
  {
    "value": 5,
    "checked": true,
    "label": "Fri"
  },
  {
    "value": 6,
    "checked": true,
    "label": "Sat"
  },
  {
    "value": 7,
    "checked": true,
    "label": "Sun"
  }
];
