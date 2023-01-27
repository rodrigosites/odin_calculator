// DOM control
let userClick = '';
let partialCalc = '';
let clickedValue = '';
let clickedOperator = '';
const storage = [];
const displayMainText = document.querySelector('.display-main');
const displayPartialText = document.querySelector('.display-partial');
const numberButtons = document.querySelectorAll('.number-btn-div');
const operatorButtons = document.querySelectorAll('.operator-btn-div');
const operateButton = document.querySelector('.operate-btn-div');

numberButtons.forEach(button => button.addEventListener('click', (event) => {
  if (userClick.length < 30) {
    userClick += button.textContent;
    displayMainText.textContent = userClick;
  }
}));

operatorButtons.forEach(button => button.addEventListener('click', (event) => {
  switch (button.textContent) {
    case 'C': 
      clearDisplay();
      break;
    case 'Del': 
      delChar();
      break;
    default:
      storage.length === 0 ? storePartial(button.textContent) : operatePartial(button.textContent);
      break;
    }
}));

operateButton.addEventListener('click', (event) => {
  if (storage.length > 0 && userClick !== '') {
    displayPartialText.textContent = `${clickedValue} ${clickedOperator} ${userClick} =`;
    displayMainText.textContent = operate(clickedOperator, parseInt (clickedValue), parseInt (userClick));
  } else if (storage.length > 0) {
      displayPartialText.textContent = `${clickedValue} ${clickedOperator} ${clickedValue} =`;
      storage[0].value = operate(clickedOperator, parseInt (clickedValue), parseInt (clickedValue));
      displayMainText.textContent = storage[0].value;
  } else {
    displayPartialText.textContent = '0 =';
  }
  clearValues();
});

const clearDisplay = () => {
  clearValues();
  displayMainText.textContent = 0;
  displayPartialText.textContent = '';
}

const clearValues = () => {
  userClick = '';
  partialCalc = '';
  clickedValue = '';
  clickedOperator = '';
  storage.length = 0; // clear the array without loop, neat!
}

const delChar = () => {
  userClick = userClick.slice(0,-1);
  displayMainText.textContent = userClick;
}

const storePartial = (operator) => {
  clickedValue = userClick;
  storage.push({'type': 'number', 'value': clickedValue});
  clickedOperator = operator;
  storage.push({'type': 'operator', 'value': clickedOperator});
  displayPartialText.textContent = `${userClick} ${operator}`;
  userClick = '';
}

const operatePartial = (operator) => {
  storage[0].value = operate(storage[1].value, parseInt(storage[0].value), parseInt(userClick));
  storage.pop();
  storage.push({'type': 'operator', 'value': operator});
  displayPartialText.textContent = `${storage[0].value} ${operator}`;
  displayMainText.textContent = `${storage[0].value}`;
  userClick = '';
}

// mathematic logic

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (operator,a,b) => {
  switch (operator) {
    case '+': return add(a,b);
    case '-': return subtract(a,b);
    case 'x': return multiply(a,b);
    case '/': return divide(a,b);
  }
};