let memory = {
    operand1 : '',
    operand2 : '',
    operator : null,
    result : null,
}

function add(a,b){
    memory.result = roundToFiveDecimals(parseFloat(a)+parseFloat(b));
}

function subtract(a,b){
    memory.result = roundToFiveDecimals(parseFloat(a)-parseFloat(b));
}

function multiply(a,b){
    memory.result = roundToFiveDecimals(parseFloat(a) * parseFloat(b));
}

function divide(a,b){
    memory.result = roundToFiveDecimals(parseFloat(a) / parseFloat(b));
}

function roundToFiveDecimals(num) {
    return (Math.round(num * 100000) / 100000).toString();
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
        case '*' :
            multiply(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
        case '/' :
            divide(memory.operand1, memory.operand2);
            populateDisplay(memory.result);
            break;
    }
}

function populateDisplay(val){
    displayContent = document.querySelector('.screen');
    displayContent.textContent = val;
    (val.includes('.')) ? toggleDecimalOff() : toggleDecimalOn();
    
    
    
}

function clearScreen(){
    document.querySelector('.screen').textContent = '';
    memory.operand1 = '';
    memory.operand2 = '';
    memory.operator = null;
    memory.result = null;
}

function modifyScreenValue(callback){
    let currentval = document.querySelector('.screen').textContent;
            for(let key in memory){
                if(currentval == memory[key]){
                    memory[key] = callback(currentval);
                    populateDisplay(memory[key]);
                }
            }
}

function toggleDecimalOn(){
    document.querySelector('#decimal').disabled = false;
}

function toggleDecimalOff(){
    document.querySelector('#decimal').disabled = true;
}

function handleInput(val){
    switch (val) {
        case 'C':
            clearScreen();
            break;
        case 'BACKSPACE':
            modifyScreenValue(currentval => currentval.slice(0, currentval.length-1));          
            break;
        case '%':
            modifyScreenValue(currentval => (parseFloat(currentval)/100).toString());
            break;
        case '/':
        case '*':
        case '+':
        case '-':
            if(memory.operand2 != ''){
                operate();
                memory.operand1 = memory.result.toString();
                memory.operand2 = '';
                memory.result = null;
            }
            memory.operator = val;
            break;
        case '=':
            if (memory.operand1 == ''|| memory.operand2 == ''){
                break;
            }
            operate();
            break;
        // case '.':
        //     toggleDecimalOff();
        default:
            if(memory.operator != null && memory.result !=null){
                clearScreen();
                memory.operand1 += val;
                populateDisplay(memory.operand1);
            }
            else if (!memory.operator){
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
    let val;
    
    switch (button.textContent){
        case '÷':
            val = '/';
            break;
        case '×':
            val = '*';
            break;
        case 'DEL':
            val = 'BACKSPACE';
            break;
        default:
            val = button.textContent;
    }

    handleInput(val);

}));

document.addEventListener( 'keydown',(event) => {
    let val = event.key.toUpperCase();
    const acceptedValues = ['BACKSPACE','C','%','/','*','+','-','0','1','2','3','4','5','6','7','8','9','.']
    if (acceptedValues.includes(val)){
        handleInput(val);
    }
})

