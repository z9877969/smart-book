import moment from 'moment';

const endOfYear = moment().endOf('year')._d;

export const changeDateFormatToMs = date => {
  const changedDate = moment(date, moment.ISO_8601)._d;
  return Date.parse(changedDate);
};

export const endOfYearIso = new Date(endOfYear).toISOString();

export const getTimeTrainingAfterEndObj = dateStartISO => {
  const dateStartMs = moment(dateStartISO).format('x');
  const timeNow = -(dateStartMs - Date.now());
  const timeObj = {};

  timeObj.sec = Math.floor(timeNow / 1000) % 60;
  timeObj.min = Math.floor(timeNow / 1000 / 60) % 60;
  timeObj.hour = Math.floor(timeNow / 1000 / 60 / 60) % 24;
  timeObj.day = Math.floor(timeNow / 1000 / 60 / 60 / 24);

  return timeObj;
};
