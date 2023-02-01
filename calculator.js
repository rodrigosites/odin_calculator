// DOM control
let userClick = '';
let clickedNumber = '';
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
  if (userClick === '.') userClick = '0';
  clickedOperator = button.textContent;
  switch (clickedOperator) {
    case 'C': 
      clearDisplay();
    break;
    case 'Del': 
      delChar();
    break;
    default:
      if (userClick != '') {
        clickedNumber = userClick;
        userClick = '';
        numberStack.push(clickedNumber);
        operatorStack.push(clickedOperator)
      } else {
        if (numberStack.length === 0) {
          numberStack.push(0);
          operatorStack.push(clickedOperator);
        } else {
          if (clickedOperator === '=' && operatorStack[0] !== '=') {
            operatorStack.push(clickedOperator)
          } else {
            operatorStack[0] = clickedOperator;
            clickedNumber = numberStack[0];
          }
        }
      }
      displayPartialText.textContent = `${numberStack[0]} ${clickedOperator}`;
      operateValues(operatorStack[0]);
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
  clickedNumber = '';
  clickedOperator = '';
  numberStack.length = 0; // clear the array without loop, neat!
  operatorStack.length = 0; // clear the array without loop, neat!
}

const delChar = () => {
  userClick = userClick.slice(0,-1);
  displayMainText.textContent = userClick;
}

const operateValues = (operator) => {
  if (numberStack.length === 2) {
    if (operatorStack[1] === '=') displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]} ${numberStack[1]} =`;
    numberStack[0] = operate(Number(numberStack[0]), operator, Number(numberStack[1]));
    if (operatorStack[1] !== '=') displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]}`;
    numberStack.pop();
    operatorStack.shift();
    if (operatorStack[0] === '=') operatorStack.pop();
  } else if (operatorStack.length > 1) {
    displayPartialText.textContent = `${numberStack[0]} ${operatorStack[0]} ${clickedNumber} =`
    numberStack[0] = operate(Number(numberStack[0]), operatorStack[0], Number(clickedNumber));
    operatorStack.pop();
  }
  displayMainText.textContent = `${numberStack[0]}`;
}

// mathematic logic

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (a,operator,b) => {
  switch (operator) {
    case '+': return add(a,b);
    case '-': return subtract(a,b);
    case 'x': return multiply(a,b);
    case '/': return b === 0 ? 'You can\'t divide a number by 0' : divide(a,b);
    break;
  }
};