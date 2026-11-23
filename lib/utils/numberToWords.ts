/**
 * Converts a numeric amount into Indian Rupees in words (Indian numbering system).
 * e.g. 2699 -> "Indian Rupees Two Thousand Six Hundred Ninety Nine Only"
 */
export function numberToWordsINR(amount: number): string {
  const units = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const num = Math.floor(Math.abs(amount));
  if (num === 0) return 'Indian Rupees Zero Only';

  function convertTwoDigits(n: number): string {
    if (n < 20) return units[n];
    const unit = n % 10;
    return `${tens[Math.floor(n / 10)]}${unit ? ' ' + units[unit] : ''}`;
  }

  function convertThreeDigits(n: number): string {
    let str = '';
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    if (hundred > 0) {
      str += `${units[hundred]} Hundred`;
    }
    if (remainder > 0) {
      str += `${str ? ' ' : ''}${convertTwoDigits(remainder)}`;
    }
    return str;
  }

  let words = '';
  let rem = num;

  // Crores (1,00,00,000)
  const crore = Math.floor(rem / 10000000);
  rem %= 10000000;
  if (crore > 0) {
    words += `${convertThreeDigits(crore)} Crore `;
  }

  // Lakhs (1,00,000)
  const lakh = Math.floor(rem / 100000);
  rem %= 100000;
  if (lakh > 0) {
    words += `${convertTwoDigits(lakh)} Lakh `;
  }

  // Thousands (1,000)
  const thousand = Math.floor(rem / 1000);
  rem %= 1000;
  if (thousand > 0) {
    words += `${convertTwoDigits(thousand)} Thousand `;
  }

  // Remaining hundreds, tens, units
  if (rem > 0) {
    words += convertThreeDigits(rem);
  }

  return `Indian Rupees ${words.trim()} Only`;
}
