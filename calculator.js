// DOM control
let userClick = '';
let clickedValue = '';
let clickedOperator = '';
const numberStack = [];
const operatorStack = [];
const displayMainText = document.querySelector('.display-main');
const displayPartialText = document.querySelector('.display-partial');
const numberButtons = document.querySelectorAll('.number-btn-div');
const operatorButtons = document.querySelectorAll('.operator-btn-div');

numberButtons.forEach(button => button.addEventListener('click', (event) => {
  if (userClick.length < 30) {
    userClick += button.textContent;
    displayMainText.textContent = userClick;
  }
}));

operatorButtons.forEach(button => button.addEventListener('click', (event) => {
  clickedOperator = button.textContent;
  switch (clickedOperator) {
    case 'C': 
      clearDisplay();
    break;
    case 'Del': 
      delChar();
    break;
    case '=':
      if (numberStack.length === 1 && userClick !== '') {
        numberStack.push(userClick);
        displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]} ${userClick} =`;
        operateValues(operatorStack[0]);
        clearValues();
      } else if (numberStack.length === 1 && userClick === '') {
          operatorStack.push(operatorStack[0]);
          if (clickedValue !== '') {
            numberStack.push(clickedValue);
          } else {
            numberStack.push(numberStack[0]);
            clickedValue = numberStack[1];
          }
          displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]} ${clickedValue} =`;
          operateValues(operatorStack[0]);
      } else {
        displayPartialText.textContent = '0 =';
        clearValues();
      }
    break;
    default:
      storeValue(clickedOperator);
    break;
    }
}));

const clearDisplay = () => {
  clearValues();
  displayMainText.textContent = 0;
  displayPartialText.textContent = '';
}

const clearValues = () => {
  userClick = '';
  clickedValue = '';
  clickedOperator = '';
  numberStack.length = 0; // clear the array without loop, neat!
}

const delChar = () => {
  userClick = userClick.slice(0,-1);
  displayMainText.textContent = userClick;
}

const storeValue = (operator) => {
  if (userClick !== '') numberStack.push(userClick);
  if (numberStack.length > 1) operateValues(operatorStack[0]);
  if (operatorStack.length === 0) {
    operatorStack.push(operator)
  } else {
    operatorStack[0] = operator;
    clickedValue = numberStack[0];
  }
  displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]}`;
  userClick = '';
}

const operateValues = (operator) => {
  numberStack[0] = operate(operator, parseInt(numberStack[0]), parseInt(numberStack[1]));
  numberStack.pop();
  operatorStack.shift();
  displayMainText.textContent = `${numberStack[0]}`;
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