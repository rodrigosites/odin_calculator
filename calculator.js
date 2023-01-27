// DOM control
let userClick = '';
let partialCalc = '';
let clickedValue = '';
let clickedOperator = '';
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
  console.log(userClick);
}));

operatorButtons.forEach(button => button.addEventListener('click', (event) => {
  switch (button.textContent) {
    case 'C': 
      clearDisplay();
      break;
    case 'Del': 
      delChar();
      break;
    case '+':
      storePartial(button.textContent);
      break;
    case '-':
      storePartial(button.textContent);
      break;
    case 'x':
      storePartial(button.textContent);
      break;
    case '/':
      storePartial(button.textContent);
      break;
  }
  console.log(`userClick: ${userClick}, partialCalc: ${partialCalc}, clickedValue: ${clickedValue}, clickedOperator: ${clickedOperator}`);
}));

operateButton.addEventListener('click', (event) => {
  displayPartialText.textContent = `${clickedValue} ${clickedOperator} ${userClick} =`;
  displayMainText.textContent = operate(clickedOperator, parseInt (clickedValue), parseInt (userClick));
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
}

const delChar = () => {
  userClick = userClick.slice(0,-1);
  displayMainText.textContent = userClick;
}

const storePartial = (operator) => {
  clickedValue = userClick;
  clickedOperator = operator;
  displayPartialText.textContent = `${userClick} ${operator}`;
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