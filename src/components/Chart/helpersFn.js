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
      // onlyNormalDate.push(moment(format).format('DD.MM'));
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

export const findDifference = (start, end) => {
  const startOfTraining = moment(start).dayOfYear();
  const endOfTraining = moment(end).dayOfYear();
  const difference = endOfTraining - startOfTraining;
  return difference;
};

// const maxCount = arrayOfCount => {
//   const newArr = [...arrayOfCount].sort((a, b) => (a > b ? -1 : 1));
//   return newArr;
// };

// const heightObj = { mob: 344, tab: 372, decs: 372 };

// const heightCalc = (width, heightConstObj) => {
//   if (width < 768) return heightConstObj.mob;
//   if (width < 1280) return heightConstObj.tab;
//   return heightConstObj.desc;
// };

// export const planPosition = (pageFact, pagePlan, arrayOfCount, width) => {
//   // console.log(pageFact, pagePlan, arrayOfCount, width);

//   const maxPages =
//     maxCount(arrayOfCount)[0] > pagePlan ? maxCount(arrayOfCount)[0] : pagePlan;
//   const height = heightCalc(width, heightObj);
//   const coeficient = (height / maxPages).toFixed(1);
//   // console.log(coeficient);

//   if (pageFact > pagePlan) {
//     return pagePlan * coeficient;
//   }
//   if (pageFact >= pagePlan && pageFact <= pagePlan + 10) {
//     return -30 + pagePlan * coeficient;
//   }
//   if (pageFact < pagePlan && pageFact >= pagePlan - 10) {
//     return 30 + pagePlan * coeficient;
//   }
//   return -30 + pagePlan * coeficient;
// };

// export const factPosition = (pageFact, pagePlan, arrayOfCount, width) => {
//   const maxPages =
//     maxCount(arrayOfCount)[0] > pagePlan ? maxCount(arrayOfCount)[0] : pagePlan;
//   const height = heightCalc(width, heightObj);
//   const coeficient = (height / maxPages).toFixed(1);
//   // console.log(coeficient);
//   // console.log((25 + pageFact) * coeficient);

//   if (pageFact > pagePlan) {
//     return -30 + pageFact * coeficient;
//   }
//   if (pageFact >= pagePlan && pageFact <= pagePlan + 10) {
//     return 30 + pageFact * coeficient;
//   }
//   if (pageFact < pagePlan && pageFact >= pagePlan - 10) {
//     return -30 + pageFact * coeficient;
//   }
//   return (25 + pageFact) * coeficient;
// };
