import { format } from 'date-fns';
import moment from 'moment';
export const getTimeFormatNormal = (time = new Date()) => {
  const formatNumber = value => `${value}`.replace(/^[0-9]$/, a => `0${a}`);
  return `${formatNumber(time.getDate())}/${formatNumber(
    time.getMonth() + 1
  )}/${time.getFullYear()}`;
};

export const getTimeFromNow = (t = moment()) => {
  const now = moment();
  const time = moment.utc(t).local();
  const timeFromNow = now - time;
  if (timeFromNow <= 3600000) {
    // 3600000  = 1 hour
    return time.fromNow().replace('minute', 'min');
  }
  if (timeFromNow <= 86400000)
    // 86400000 = 1 day
    return time.format('hh:mma').toLocaleUpperCase();
  return time.format('DD/MM/YYYY');
};

export const formatTime = time => {
  return format(new Date(time), 'dd MMM yyyy');
};
