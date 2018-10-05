let tempDigits = [] // temporary store each clicked number.
let digits = [];
let operands = [];
let equalToClicked = false;
let operationPerformed = false; // changes to true when an operation is clicked

function operate(operator, x, y) {
  const operations = {
    '+': () => x + y,
    '-': () => x - y,
    '*': () => x * y,
    '/': () => x / y,
  };
  return operations[operator]();
}

let operationDisplay = document.getElementsByClassName('display_box')[0];
let solutionDisplay = document.getElementsByClassName('display_box')[1];
let allButtons = Array.from(document.querySelectorAll('button'));

allButtons.map(button => {
  button.addEventListener('click', event => {
    let name = event.target.name;
    // console.log(event.target);
    let content = event.target.textContent;
    let buttonId = event.target.id;

    if (name == 'num') {
      if (buttonId != 'dot') {     // for when the clicked button is not a dot.
        if (equalToClicked) clear('basic'); //empties the input div after an equal_to operation

        tempDigits.push(parseInt(content));
        operationDisplay.innerHTML += content;
        operationPerformed = false; // reset the operation performed boolen
      } else { // clicked button is a dot.
        tempDigits.push(content);
        operationDisplay.innerHTML += content;
      }

    } else if (name == 'operand') {
      if (buttonId != 'equal_to') {
        if (operationPerformed) disableOperation();
        if (equalToClicked) clear('basic');

        digits.push(Number(tempDigits.join('')));
        tempDigits = []; // emty tempDigits
        operands.push(content);
        operationDisplay.innerHTML += content;
        operationPerformed = true;
      } else {
        // console.log('code to call operation');
        digits.push(Number(tempDigits.join('')));
        tempDigits = [];
        equalToClicked = true;

        let solution = digits.shift(); // pass the first number to solution
        let i = operands.length;
        while (i >= 1) {
          solution = operate(operands.shift(), solution, digits.shift());
          i--;
        }
        solutionDisplay.innerHTML = Math.round(solution * 100) / 100;
      }

    } else { // if name == CE
      clear('CE');
    }

  }); // end of event listener.
}); // end of .map()

function clear(type) {
  switch (type) {
    case 'basic':
      operationDisplay.innerHTML = '';
      solutionDisplay.innerHTML = '';
      equalToClicked = false;
      break;

    default: // type == 'CE'
      operationDisplay.innerHTML = '';
      solutionDisplay.innerHTML = '';
      digits = [];
      operands = [];
      tempDigits = [];
  }
}

// keyboard events

// fix for firefox interrupt of / symbol
window.addEventListener('keydown', event => {
  let key = event.which.toString();
  if (key === '111') {
    event.preventDefault();
  }
});

document.addEventListener('keyup', event => {
  let key = event.keyCode.toString();
  // console.log(key);
  const btn = allButtons.find(btnn => {
    return (btnn.getAttribute('data-key') === key);
  });

  btn.click();
  btn.classList.add('clicked');

  setTimeout(function () { // temporary style button
    btn.classList.remove('clicked');
  }, 150);
});

function disableOperation() {
  let operationButtons = Array.from(document.querySelectorAll('.operand'));
  // console.log(operationButtons);
  operationButtons.map(btns => {
    if (btn.id != 'equal_to') {
      btn.disable
    }
  });
}


// let result = testNum.shift()
// let i = testOperation.length;
// while (i >= 1) {
//   result = operate(testOperation.shift(), result, testNum.shift());
//   i--;
// }
// console.log(result)

// failed Logics
//
// for (var i = testNum.length; i !< 0; i) {
//   // testNum[i]
//   console.log(operate(testOperation.shift(), testNum.shift(), testNum.shift()));
// }
//

// let i = testOperation.length;
// while (i >= 1) {
//   console.log(operate(testOperation.shift(), testNum.shift(), testNum.shift()));
//   i--;
// }
// i = testNum.length;
//
// while (i >= 0) {
//   val = operate(testOperation.shift(), testNum.shift(), testNum.shift());
//   // i = testNum.length
//   if (i == 0) {
//     // console.log(operate(testOperation.shift(), testNum.shift(), testNum.shift()));
//     break;
//   }
// }

// testNum.reduce(function(newValue, num) {
//   console.log(operate(testOperation.shift(), testNum.shift(), testNum.shift()));
// }, 0)


console.log('lalala'); // making sure the code is actually running till the end
