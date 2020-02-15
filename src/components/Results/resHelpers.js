export const getLastTenReadPagesSortedByDateDesc = arr => {
  const result = arr.sort((a, b) => (a.date > b.date ? -1 : 1));
  if (result.length > 10) result.length = 10;
  return result;
};

export const formatDate = date => {
  let dd = new Date(date).getDate();
  if (dd < 10) dd = `0${dd}`;
  let mm = new Date(date).getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;
  const yyyy = new Date(date).getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};
export const formatTime = date => {
  let hh = new Date(date).getHours();
  if (hh < 10) hh = `0${hh}`;
  let mm = new Date(date).getMinutes();
  if (mm < 10) mm = `0${mm}`;
  let ss = new Date(date).getSeconds();
  if (ss < 10) ss = `0${ss}`;
  return `${hh}:${mm}:${ss}`;
};
