import moment from 'moment';

/* eslint-disable no-underscore-dangle */
const endOfYear = moment().endOf('year')._d;

export const changeDateFormatToMs = date => {
  const changedDate = moment(date, moment.ISO_8601)._d;
  return Date.parse(changedDate);
};

export const endOfYearIso = new Date(endOfYear).toISOString();
