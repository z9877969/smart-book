import moment from 'moment';

const endOfYear = moment().endOf('year')._d;

export const changeDateFormatToMs = date => {
  const changedDate = moment(date, moment.ISO_8601)._d;
  return Date.parse(changedDate);
};

export const endOfYearIso = new Date(endOfYear).toISOString();

export const getTimeTrainingAfterEndObj = (dateStartISO, isTimerTimeEnded) => {
  const dateStartMs = moment(dateStartISO).format('x');

  const timeNow = !isTimerTimeEnded
    ? Date.now() - dateStartMs
    : dateStartMs - Date.now();
  const timeObj = {};

  timeObj.sec = Math.floor(timeNow / 1000) % 60;
  timeObj.min = Math.floor(timeNow / 1000 / 60) % 60;
  timeObj.hour = Math.floor(timeNow / 1000 / 60 / 60) % 24;
  timeObj.day = Math.floor(timeNow / 1000 / 60 / 60 / 24);

  return timeObj;
};

export const getLocalTime = timeUTS => {
  const a = moment(timeUTS);
  const timeZone = a.format() / 60;
  a._tzm = timeZone;
  return a.format().split('+')[0];
};

export const timeEndState = '2020-02-26T19:29:00';

// console.log('dateStartMs:', moment(timeEndState).format('x'));
// console.log('timeNow isTimerTimeEnded:', Date.now() - moment(timeEndState).format('x'));
// console.log('timeNow !isTimerTimeEnded:',  moment(timeEndState).format('x') - Date.now());
// console.log('getTimeTrainingAfterEndObj :', getTimeTrainingAfterEndObj());
