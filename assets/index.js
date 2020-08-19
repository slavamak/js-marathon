/* First Task */
alert('First task');

const firstRow = prompt('Enter the first row');
const secondRow = prompt('Enter the second row');
const character = prompt('Enter the desired character');

function getRow(firstRow, secondRow) {
  const firstRowChar = calcNumberChar(firstRow, character);
  const secondRowChar = calcNumberChar(secondRow, character);

  const result = firstRowChar > secondRowChar ? firstRow : secondRow;

  return result;
};

function calcNumberChar(string, char) {
  let result = 0;

  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === char) {
      result += 1;
    };
  };

  return result;
};

alert('This row contains more "' + character + '" characters: ' + getRow(firstRow, secondRow));




/* Second task */
alert('Second task');

const rawPhoneNumber = prompt('Enter the phone number.');

function formattedPhoneNumber(phoneNumber) {
  const hasPlus = phoneNumber.charAt(0) === '+';
  const isCorrect = hasPlus ? phoneNumber.length === 12 : phoneNumber.length === 11;

  if (!isCorrect) {
    return false;
  };

  let startChar = hasPlus ? 1 : 0; // Если есть "+" начинаем форматировать со второго символа, в ином случае с первого
  let result = '';

  for (let i = 0; i < phoneNumber.length; i++) {
    result += phoneNumber.charAt(i);

    switch (i) {
      case startChar:
        result += ' (';
        break;
      case startChar + 3:
        result += ') ';
        break;
      case startChar + 6:
        result += '-';
        break;
      case startChar + 8:
        result += '-';
        break;
    };
  };

  return result;
};

function showMessage(result) {
  const message = result ? 'Your formatted phone number: ' + result : 'Enter correct phone number (example: 89001005040 or +79001005040).';

  alert(message);
};

showMessage(formattedPhoneNumber(rawPhoneNumber));