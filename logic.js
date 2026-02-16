
//Classes
class Operation {
    Calculate() { }
}

class Division extends Operation {
    Calculate(firstNumber, secondNumber) { return firstNumber / secondNumber; }
}

class Multiply extends Operation {
    Calculate(firstNumber, secondNumber) { return firstNumber * secondNumber; }
}

class Add extends Operation {
    Calculate(firstNumber, secondNumber) { return firstNumber + secondNumber; }
}

class Substract extends Operation {
    Calculate(firstNumber, secondNumber) { return firstNumber - secondNumber; }
}

const OP_TYPES = Object.freeze({
    'add': new Add(),
    'sub': new Substract(),
    'mul': new Multiply(),
    'div': new Division()
});

//Variables
let currentFistNumber = 0;
let currentSecondNumber = 0;
let currentOperation = null;

let decimalMultiplier = 1;
let isDecimal = false;

const buttonContainer = document.querySelector('#containerButtons')

const buttonEnter = document.querySelector('.enter');
buttonEnter.addEventListener('click', () => OnEnterButtonClicked());

const buttonDot = document.querySelector('.dot');
buttonDot.addEventListener('click', () => OnDotButtonClicked());

const buttonDEL = document.querySelector('.del');
buttonDEL.addEventListener('click', () => ClearCalcData());

const paragraphLogCalculator = document.querySelector('#logCalculator');


buttonContainer.addEventListener('click', (e) => {
    const clickedBtn = e.target;
    if (!clickedBtn.matches('.button')) return;

    if (clickedBtn.dataset.num) {
        OnButtonNumberClicked(parseInt(clickedBtn.dataset.num));
    }
    else if (clickedBtn.dataset.op) {
        OnButtonOperationClicked(clickedBtn.dataset.op);
    }

})


function OnButtonNumberClicked(newNumber) {
    if (!isDecimal) {

        if (!currentOperation)
            currentFistNumber = (currentFistNumber * 10) + newNumber;

        else
            currentSecondNumber = (currentSecondNumber * 10) + newNumber;

    }
    else {

        let newDecimalPart = newNumber / (10 * decimalMultiplier);

        if (!currentOperation)
            currentFistNumber += newDecimalPart;
        else
            currentSecondNumber += newDecimalPart;

        decimalMultiplier *= 10;
    }
}

function OnButtonOperationClicked(newOperationData) {

    const newOperation = OP_TYPES[newOperationData];
    if (!newOperation) return;

    currentOperation = newOperation;

    //Reset decimal multiplaier for number 2
    decimalMultiplier = 1;
    isDecimal = false;
}

function OnEnterButtonClicked() {
    if (!currentOperation) return;

    const result = currentOperation.Calculate(currentFistNumber, currentSecondNumber);

    console.log("Il risultato è: " + result);
    paragraphLogCalculator.innerHTML = result;

    currentFistNumber = result;
    currentSecondNumber = 0;

    decimalMultiplier = 1;
    isDecimal = false;
}

function OnDotButtonClicked() {
    isDecimal = true;
    decimalMultiplier = 1;
}

function ClearCalcData() {
    currentFistNumber = 0;
    currentSecondNumber = 0;
    currentOperation = null;

    decimalMultiplier = 1;
    isDecimal = false;

    paragraphLogCalculator.innerHTML = 0;
}

