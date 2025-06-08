
 
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

            if (button.classList.contains("operator")){
                if (displayScreen.value === "") return;
                firstNumber = displayScreen.value;
                operator = clickedValue;
                displayScreen.value += operator;
                shouldResetDisplay = true;
                return;
            }
            
            if (button.id === "answer"){
                if (firstNumber === "" || operator === "") return;
                secondNumber = displayScreen.value;
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                displayScreen.value = result;
                firstNumber = result;
                secondNumber = "";
                operator = "";
                shouldResetDisplay = true;
                return;  
            }

            if (button.id === "Del"){
                displayScreen.value = displayScreen.value.slice(0, -1);
                return;
            }

            if (button.id === "AC"){
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
            console.log(event.key);
    });         

}



populateDisplay(); 





