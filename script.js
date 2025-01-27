let memory = {
    operand1 : '',
    operand2 : '',
    operator : null,
    result : null,
}

function add(a,b){
    memory.result = parseInt(a)+parseInt(b);
}

function subtract(a,b){
    memory.result = parseInt(a)-parseInt(b);
}

function multiply(a,b){
    memory.result = parseInt(a) * parseInt(b);
}

function divide(a,b){
    memory.result = parseInt(a) / parseInt(b);
}


function operate(){
    switch (memory.operator) {
        case '+' : 
            add(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
        case '-' :
            subtract(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
        case '×' :
            multiply(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
        case '÷' :
            divide(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
    }
}

function populateDisplay(val){
    displayContent = document.querySelector('.screen');
    displayContent.textContent = val;
    
}

function clearScreen(){
    document.querySelector('.screen').textContent = '';
    memory.operand1 = '';
    memory.operand2 = '';
    memory.operator = null;
    memory.result = null
}

function handleInput(val){
    switch (val) {
        case 'C':
            clearScreen();
        case 'DEL':
            //some other function//
        case '%':
        case '÷':
        case '×':
        case '+':
        case '-':
            memory.operator = val;
            break;
        case '=':
            operate();
            console.log(memory.result);
            break;
        case '.':
            //some other function//
        default:
            if (!memory.operator){
                memory.operand1 += val;
                populateDisplay(memory.operand1);
            }else{
                memory.operand2 += val;
                populateDisplay(memory.operand2);
            }

    }
}

let buttons = document.querySelectorAll('button');

buttons.forEach((button) => button.addEventListener('click', () => {
    
    handleInput(button.textContent);

}));

