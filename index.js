const calculator = document.querySelector('.calculator')
const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.number')
let currentDisplay = ''
let justCalculated = false

function add(x, y){
    return x + y
}

function subtract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    if (y === 0){
        return 'Cannot divide by zero'
    }
    return x / y
}

let firstNumber
let operator
let secondNumber

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)
    }
}

calculator.addEventListener('click', (e) => {
    if(e.target.classList.contains('number')){
        if (justCalculated){
            currentDisplay = "";
            firstNumber = null;
            operator = null;
            justCalculated = false;
    }
        currentDisplay += e.target.textContent
        display.textContent = currentDisplay

        console.log(e.target.textContent)
    }

    if(e.target.classList.contains('decimal')){
        if(justCalculated){
            currentDisplay = ''
            justCalculated = false
        }

        if(currentDisplay.includes('.')){
            return
        }

        if(currentDisplay === ''){
            currentDisplay = '0.'
        } else {
            currentDisplay += '.'
        }

        display.textContent = currentDisplay
        return
    }

    if(e.target.classList.contains('operator')){
         if(firstNumber != null && currentDisplay === ''){
            operator = e.target.textContent
         }

        else if(firstNumber != null && currentDisplay !== ''){
            secondNumber = Number(currentDisplay)
            let result = operate(operator, firstNumber, secondNumber)
        
            if(typeof result === 'number'){
                result = Number(result.toFixed(8))
            }

            display.textContent = result

            if(typeof result === 'number'){
                firstNumber = result
            } else{
                firstNumber = null
            }

            operator = e.target.textContent
            currentDisplay = ''
        }
        else if(currentDisplay != ''){
            firstNumber = Number(currentDisplay)
            operator = e.target.textContent
            currentDisplay = ''
        }

       
    }

    if(e.target.classList.contains('clear')){
        currentDisplay = ''
        firstNumber = null
        secondNumber = null
        operator = null
        display.textContent = ""    
    }

    if(e.target.classList.contains('equals')){
        if(firstNumber != null && operator != null && currentDisplay != ''){
            secondNumber = Number(currentDisplay)
            let result = operate(operator, firstNumber, secondNumber)
         
            if(typeof result === 'number'){
                result = Number(result.toFixed(8))
            }

            display.textContent = result

            if(typeof result === 'number'){
                firstNumber = result
            } else {
                firstNumber = null
            }

            currentDisplay = ''
            justCalculated = true
        }
        
    }

    if(e.target.classList.contains('backspace')){
        if(currentDisplay !== ''){
            currentDisplay = currentDisplay.slice(0, -1)
            display.textContent = currentDisplay
        }
    }
})

