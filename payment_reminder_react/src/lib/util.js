import { formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date) => {
  const dateProvided = new Date(date);
  const timeZone = 'America/Los_Angeles';
  const formattedDate = formatInTimeZone(dateProvided, timeZone,'MM-dd-yyyy');
  return formattedDate;
};

export const todaysDate = () => {
  // Get date in Pacific Time
  const now = new Date(); // Current local time
  const timeZone = 'America/Los_Angeles';
  const todaysDate = formatInTimeZone(now, timeZone, 'MM-dd-yyyy');
  return todaysDate;
};

// Function to calculate total amount from payments
export const getTotalPaymentAmount = (paymentsArray) => {
  const totalAmount = paymentsArray.reduce((total, payment) => total + payment.amount, 0);

  // Format the total amount as a dollar amount
  const formattedTotalAmount = totalAmount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return formattedTotalAmount;
};
