// DOM control
let userClick = '';
const displayText = document.querySelector('.display-container');
const numberButtons = document.querySelectorAll('.number-btn-div');
const operatorButtons = document.querySelectorAll('.operator-btn-div');

numberButtons.forEach(button => button.addEventListener('click', (event) => {
  userClick += button.textContent;
  displayText.textContent = userClick;
  console.log(userClick);
}));

// mathematic logic

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (operator,a,b) => {
  switch (operator) {
    case '+': return add(a,b);
    case '-': return subtract(a,b);
    case '*': return multiply(a,b);
    case '/': return divide(a,b);
  }
};