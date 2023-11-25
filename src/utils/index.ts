export function convertToPersianNumbers(englishNumber: number): string {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const persianDecimalSeparator = '٫'; // U+066B: Persian Decimal Separator

  const englishNumberString = englishNumber.toString();
  let persianNumberString = '';

  for (let i = 0; i < englishNumberString.length; i++) {
    const char = englishNumberString.charAt(i);
    const isDigit = /\d/.test(char);

    persianNumberString += isDigit ? persianNumbers[parseInt(char, 10)] : char;

    // Replace the decimal point with the Persian decimal separator
    if (char === '.') {
      persianNumberString += persianDecimalSeparator;
    }
  }

  return persianNumberString;
}
