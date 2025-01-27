let memory = {
    operand1 : '',
    operand2 : '',
    operator : null,
    result : null,
}

function add(a,b){
    memory.result = parseInt(a)+parseInt(b);
    console.log(memory.result);
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
            break;
        case 'BACKSPACE':
            let currentval = document.querySelector('.screen').textContent;
            for(let key in memory){
                if(currentval == memory[key]){
                    memory[key] = currentval.slice(0, currentval.length-1);
                    populateDisplay(memory[key]);
                }
            }
            
            break;
        case '%':
            //some other function//
            break
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
    let val;

    // if(button.textContent == '÷'){
    //     val = '/';
    // }else if(button.textContent == '×'){
    //     val = '*';
    // }else if(button.textContent == 'DEL'){
    //     val = 'BACKSPACE'
    // }else{
    //     val = button.textContent;
    // }
    
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

