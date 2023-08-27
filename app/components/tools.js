const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

function convertNumberToWords(number) {
    if (number === 0) return 'zero';

    let result = '';
    let thousandsIndex = 0;

    while (number > 0) {
        const chunk = number % 1000;
        if (chunk !== 0) {
            result = convertChunkToWords(chunk) + thousands[thousandsIndex] + ' ' + result;
        }
        thousandsIndex++;
        number = Math.floor(number / 1000);
    }

    return result.trim();
}

function convertChunkToWords(chunk) {
    if (chunk === 0) return '';

    let words = '';

    const hundredsDigit = Math.floor(chunk / 100);
    const tensDigit = Math.floor((chunk % 100) / 10);
    const onesDigit = chunk % 10;

    if (hundredsDigit > 0) {
        words += ones[hundredsDigit] + ' hundred ';
    }

    if (tensDigit === 1 && onesDigit > 0) {
        words += teens[onesDigit] + ' ';
    } else {
        words += tens[tensDigit] + ' ' + ones[onesDigit] + ' ';
    }

    return words;
}

export { convertNumberToWords };
