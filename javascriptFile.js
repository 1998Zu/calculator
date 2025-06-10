
 
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;
                
                
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
    return b != 0 ? a / b : "Error";
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}


function populateDisplay(){
    const buttons = document.querySelectorAll("button");
    const displayScreen = document.querySelector(".displayScreen");
    
 
    buttons.forEach(button => {
       button.addEventListener("click", () => {
            let clickedValue = button.textContent;
        

            if (button.classList.contains("number")) {
                if (shouldResetDisplay){
                    displayScreen.value = "";
                    shouldResetDisplay = false;
                }
                displayScreen.value += clickedValue;
                return;
            }

            if (button.classList.contains("operator")) {
                const clickedOperator = clickedValue;
            
                if (displayScreen.value === "") return;
            
                const lastChar = displayScreen.value.slice(-1);
                if (["+", "-", "*", "/"].includes(lastChar)) {
                    displayScreen.value = displayScreen.value.slice(0, -1) + clickedOperator;
                    operator = clickedOperator;
                    return;
                }

                if (firstNumber !== "" && operator !== "") {
                    const secondNumRaw = displayScreen.value.replace(firstNumber + operator, "");
                    if (secondNumRaw !== "") {
                        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumRaw));
                        const rounded = Math.round(result * 100) / 100;
                        firstNumber = rounded;
                        displayScreen.value = firstNumber + clickedOperator;
                        operator = clickedOperator;
                        shouldResetDisplay = true;
                        return;
                    }
                }
            
                firstNumber = displayScreen.value;
                operator = clickedOperator;
                displayScreen.value += clickedOperator;
                shouldResetDisplay = true;
                return;
            }
            
            
            if (button.id === "answer"){
                if (firstNumber === "" || operator === "") return; 
                secondNumber = displayScreen.value.replace(firstNumber + operator, "");
                if (secondNumber === "") return;
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                const roundedResult = Math.round (result *100)/100;
                displayScreen.value = roundedResult;
                firstNumber = roundedResult;
                secondNumber = "";
                operator = "";
                shouldResetDisplay = true;
                return;  
            }

            if (button.id === "Del"){
                displayScreen.value = displayScreen.value.slice(0, -1);
                return;
            }

            if (button.id === "Clear"){
                displayScreen.value = "";
                firstNumber = "";
                secondNumber ="";
                operator = "";
                shouldResetDisplay = false;
                return;
            }

            if (button.id === "period"){
                if(!displayScreen.value.includes(".")){
                   displayScreen.value += ".";
                }
                return;
            }  
         
       }); 
    });

    
    let textBox = document.querySelector(".displayScreen");
        textBox.addEventListener("keydown", (event) => {
            let keyValue = event.key;

            if (!isNaN(keyValue)) {
                if (shouldResetDisplay){
                    textBox.value = "";
                    shouldResetDisplay = false;
                }
                textBox.value += keyValue;
                return;
            }

            if (["+", "-", "/", "*"].includes(keyValue)) {
                const lastChar = textBox.value.slice(-1);
            
                if (textBox.value === "") return;
            
                if (["+", "-", "*", "/"].includes(lastChar)) {
                    textBox.value = textBox.value.slice(0, -1) + keyValue;
                    operator = keyValue;
                    return;
                }
            
                if (firstNumber !== "" && operator !== "") {
                    const operatorIndex = textBox.value.indexOf(operator);
                    const secondRaw = textBox.value.substring(operatorIndex + 1);
                    if (secondRaw !== "") {
                        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondRaw));
                        const rounded = Math.round(result * 100) / 100;
                        textBox.value = rounded + keyValue;
                        firstNumber = rounded;
                        operator = keyValue;
                        shouldResetDisplay = true;
                        return;
                    }
                }
            
                firstNumber = textBox.value;
                operator = keyValue;
                textBox.value += keyValue;
                shouldResetDisplay = true;
                return;
            }
            
            

            if (keyValue === "=" || event.key === "Enter"){
                if (firstNumber === "" || operator === "") return;
                const operatorIndex = textBox.value.indexOf(operator);
                secondNumber = textBox.value.substring(operatorIndex + 1);
                if (secondNumber === "") return;
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                const roundedResult = Math.round (result * 100)/ 100;
                textBox.value = roundedResult;
                firstNumber = roundedResult;
                secondNumber = "";
                operator = "";
                shouldResetDisplay = true;
                return;  
            } 


            if (keyValue === "Backspace"){
                textBox.value = textBox.value.slice(0, -1);
                return;
            }

            if (keyValue.toUpperCase() === "C" || event.key === "Escape"){
                textBox.value = "";
                firstNumber = "";
                secondNumber ="";
                operator = "";
                shouldResetDisplay = false;
                return;
            }


            if (keyValue === "."){
                if(!textBox.value.includes(".")){
                   textBox.value += ".";
                }
                return;
            }  

    });         

}



populateDisplay(); 





