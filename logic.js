
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
let isDecimalNumber = false;

const buttonContainer = document.querySelector('#containerButtons')

const buttonEnter = document.querySelector('.enter');
buttonEnter.addEventListener('click', () => OnEnterButtonClicked());

const buttonDot = document.querySelector('.dot');
buttonEnter.addEventListener('click', () => OnDotButtonClicked());


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
    if (isDecimalNumber) 
    {
        if (!currentOperation)
            currentFistNumber += newNumber;
        else
            currentSecondNumber += newNumber;
    }
    else
    {
        if (!currentOperation)
            currentFistNumber = newNumber;
        else
            currentSecondNumber = newNumber;
    }
    
}

function OnButtonOperationClicked(newOperationData) {

    const newOperation = OP_TYPES[newOperationData];
    if (!newOperation) return;

    currentOperation = newOperation;
}

function OnEnterButtonClicked() {
    const result = currentOperation.Calculate(currentFistNumber, currentSecondNumber);

    console.log("Il risultato è: " + result);

    ClearCalcData();
}

function OnDotButtonClicked() {
    isDecimalNumber = true;
}

function ClearCalcData() {
    currentFistNumber = 0;
    currentSecondNumber = 0;
    currentOperation = null;
    isDecimalNumber = false;
}

