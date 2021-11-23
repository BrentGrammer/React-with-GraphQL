export default function formatMoney(amountInCents = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // take off double zeros if price is xx.00
  if (amountInCents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(amountInCents / 100);
}
