function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

let firstNumber = 0;
let operator;
let secondNumber = 0;

function operate(operator, firstNumber, secondNumber){
    if (operator === "+") return add(firstNumber, secondNumber);

    if (operator === "-") return subtract(firstNumber, secondNumber);

    if (operator === "*") return multiply(firstNumber, secondNumber);

    if (operator === "/") return divide(firstNumber, secondNumber);

}

function populateDisplay(){
    
}