const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const percentageBtn = document.getElementById("percentage");
const squareRootBtn = document.getElementById("square-root");
const squareBtn = document.getElementById("square");

// Calculate the first and second values depending on operator
const calculate = {
    "/": (firstNumber, secoondNumber) => firstNumber / secoondNumber,
    "*": (firstNumber, secoondNumber) => firstNumber * secoondNumber,
    "+": (firstNumber, secoondNumber) => firstNumber + secoondNumber,
    "-": (firstNumber, secoondNumber) => firstNumber - secoondNumber,
    "=": (secoondNumber) => secoondNumber,
  };
  

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if firstValue is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not, add on to it
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function calculatePercentage() {
  const currentValue = Number(calculatorDisplay.textContent);
  calculatorDisplay.textContent = (currentValue / 100).toString();
  awaitingNextValue = true;
}

function calculateSquareRoot() {
  const currentValue = Number(calculatorDisplay.textContent);
  calculatorDisplay.textContent = Math.sqrt(currentValue).toString();
  awaitingNextValue = true;
}

function calculateSquare() {
  const currentValue = Number(calculatorDisplay.textContent);
  calculatorDisplay.textContent = Math.pow(currentValue, 2).toString();
  awaitingNextValue = true;
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operator && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
  if (operator !== "=") {
    calculatorDisplay.textContent += ` ${operator}`;
  }
}

function backspace() {
  const currentValue = calculatorDisplay.textContent;
  if (currentValue.length > 1) {
    calculatorDisplay.textContent = currentValue.slice(0, -1);
  } else {
    calculatorDisplay.textContent = "0";
  }
}
// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event Listeners for numbers, operators, and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});


// Event Listener
clearBtn.addEventListener("click", resetAll);
backspaceBtn.addEventListener("click", backspace);
percentageBtn.addEventListener("click", calculatePercentage);
squareRootBtn.addEventListener("click", calculateSquareRoot);
squareBtn.addEventListener("click", calculateSquare);
