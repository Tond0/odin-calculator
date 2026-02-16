// Base class for the Strategy Pattern: defines a common interface for all operations
class Operation {
    // Method to be implemented by subclasses
    Calculate() {}
}

// Concrete implementation of Operation for Division
class Division extends Operation {
    // Performs division and handles division by zero returning an error string
    Calculate(a, b) {
        return b !== 0 ? a / b : "Error";
    }
}

// Concrete implementation of Operation for Multiplication
class Multiply extends Operation {
    // Performs multiplication between two numbers
    Calculate(a, b) {
        return a * b;
    }
}

// Concrete implementation of Operation for Addition
class Add extends Operation {
    // Performs addition between two numbers
    Calculate(a, b) {
        return a + b;
    }
}

// Concrete implementation of Operation for Subtraction
class Substract extends Operation {
    // Performs subtraction between two numbers
    Calculate(a, b) {
        return a - b;
    }
}

// Object mapping keys to operation instances, frozen to prevent modification
const OP_TYPES = Object.freeze({
    add: new Add(),
    sub: new Substract(),
    mul: new Multiply(),
    div: new Division(),
});

// Holds the first operand as a string to preserve input formatting like "0.00"
let currentFirstNumber = "0";
// Holds the second operand as a string
let currentSecondNumber = "";
// Stores the currently selected operation object
let currentOperation = null;
// Flag to track which operand is being modified
let isEnteringSecond = false;

// Reference to the display element
const paragraphLogCalculator = document.querySelector("#logCalculator");
// Reference to the main buttons container for event delegation
const buttonsContainer = document.querySelector("#containerButtons");

// Single event listener for all buttons using Event Delegation
buttonsContainer.addEventListener("click", (e) => {
    // Get the target of the click
    const clickedBtn = e.target;
    // Exit if the clicked element is not a button
    if (!clickedBtn.matches(".button")) return;

    // Route the click to the appropriate function based on data attributes or classes
    if (clickedBtn.dataset.num) OnButtonNumberClicked(clickedBtn.dataset.num);
    else if (clickedBtn.dataset.op)
        OnButtonOperationClicked(clickedBtn.dataset.op);
    else if (clickedBtn.classList.contains("enter")) OnEnterButtonClicked();
    else if (clickedBtn.classList.contains("dot")) OnDotButtonClicked();
    else if (clickedBtn.classList.contains("del")) ClearCalcData();
});

// Handles numeric input appending digits to the active operand
function OnButtonNumberClicked(newDigit) {
    // If we are modifying the first number
    if (!isEnteringSecond) {
        // Replace initial "0" or append the new digit
        currentFirstNumber =
            currentFirstNumber === "0"
                ? newDigit
                : currentFirstNumber + newDigit;
        Display(currentFirstNumber);
    } else {
        // Append digit to the second number
        currentSecondNumber += newDigit;
        Display(currentSecondNumber);
    }
}

// Handles operation button clicks and toggles the second operand input
function OnButtonOperationClicked(newOperationData) {
    // Validate that the operation type exists
    if (!OP_TYPES[newOperationData]) return;
    // Chained operations: calculate result if a second number already exists
    if (currentSecondNumber !== "") OnEnterButtonClicked();
    // Assign the operation instance
    currentOperation = OP_TYPES[newOperationData];
    // Switch input focus to the second number
    isEnteringSecond = true;
}

// Executes the calculation and handles precision/reset logic
function OnEnterButtonClicked() {
    // Ensure an operation and a second number exist before proceeding
    if (!currentOperation || currentSecondNumber === "") return;

    // Convert string inputs to floating point numbers for math
    const n1 = parseFloat(currentFirstNumber);
    const n2 = parseFloat(currentSecondNumber);

    // Perform the calculation via Strategy Pattern
    let result = currentOperation.Calculate(n1, n2);

    // Fix floating point precision issues (e.g., 0.1 + 0.2) and remove trailing zeros
    if (typeof result === "number") {
        result = parseFloat(result.toPrecision(12));
    }

    // Show the result
    Display(result);

    // Store result as the new first number for future operations
    currentFirstNumber = result.toString();
    // Reset second number and operation state
    currentSecondNumber = "";
    isEnteringSecond = false;
    currentOperation = null;
}

// Handles the decimal point button preserving string logic
function OnDotButtonClicked() {
    // Logic for the first number
    if (!isEnteringSecond) {
        // Prevent multiple dots in one number
        if (!currentFirstNumber.includes(".")) {
            currentFirstNumber += ".";
            Display(currentFirstNumber);
        }
    } else {
        // If second number is empty, treat dot as "0."
        if (currentSecondNumber === "") currentSecondNumber = "0";
        // Prevent multiple dots in one number
        if (!currentSecondNumber.includes(".")) {
            currentSecondNumber += ".";
            Display(currentSecondNumber);
        }
    }
}

// Resets all state variables to their initial values
function ClearCalcData() {
    currentFirstNumber = "0";
    currentSecondNumber = "";
    currentOperation = null;
    isEnteringSecond = false;
    Display("0");
}

// Updates the calculator's display text
function Display(content) {
    paragraphLogCalculator.innerHTML = content;
}