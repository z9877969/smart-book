import moment from 'moment';

export const createArrayOfDate = array => {
  const onlyDate = [];
  const onlyNormalDate = [];

  array.forEach(train => {
    const day = moment(train.date).dayOfYear();

    if (!onlyDate.includes(day)) {
      onlyDate.push(day);

      const format = moment().dayOfYear(day)._d;
      onlyNormalDate.push(moment(format).format('YYYY/MM/DD'));
    }
  });
  return onlyNormalDate;
};

export const createArrayOfCount = (arr, allArr) => {
  const arrayOfCount = [];

  arr.forEach(date => {
    const count = allArr.reduce((acc, el) => {
      if (moment(el.date).format('YYYY/MM/DD') === date) {
        // eslint-disable-next-line no-param-reassign
        acc += el.count;
      }
      return acc;
    }, 0);

    arrayOfCount.push(count);
  });
  return arrayOfCount;
};

export const makeAverage = (number, lenght) => {
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= lenght; i++) arr.push(number);
  return arr;
};

export const findDifference = (
  start,
  end,
  // arrayOfDate
) => {
  const startOfTraining = moment(start).dayOfYear();
  const endOfTraining = moment(end).dayOfYear();
  const difference = endOfTraining - startOfTraining;
  return difference;
  // const differenceWithDeadline = difference + (arrayOfDate.length - difference);
  // return differenceWithDeadline;
};
