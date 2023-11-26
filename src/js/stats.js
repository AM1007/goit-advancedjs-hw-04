/**
 * Formatting large numeric values for photocard statistics
 * @param {*} number
 * @returns
 */
export default function numberText(number) {
  let outputNumber = null;
  switch (true) {
    case number >= 100000000:
      outputNumber = Math.round(number / 1000000);
      return `${outputNumber}M`;
      break;
    case number >= 1000000:
      outputNumber = Math.round(number / 100000) / 10;
      return `${outputNumber}M`;
      break;
    case number >= 100000:
      outputNumber = Math.round(number / 1000);
      return `${outputNumber}k`;
      break;
    case number >= 1000:
      outputNumber = Math.round(number / 100) / 10;
      return `${outputNumber}k`;
      break;
    default:
      return number;
      break;
  }
}
