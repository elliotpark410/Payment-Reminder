import { formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).replace(/\//g, ' / ');
};

export const todaysDate = () => {
    // Get date in Pacific Time
    const now = new Date(); // Current local time
    const timeZone = 'America/Los_Angeles';
    const todaysDate = formatInTimeZone(now, timeZone, 'MM-dd-yyyy');
    return todaysDate
}