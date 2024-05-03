
var screen = document.querySelector('#screen');
var btn=document.querySelectorAll('.btn');

for(item of btn)
{
    console.log('Button clicked');
    item.addEventListener('click', (e) => {
        btntext = e.target.innerText; 

        if(btntext == '×')
        {
            btntext = '*';
        }
        if(btntext == '÷')
        {
            btntext = '/';
        }
        screen.value+=btntext;
    });
} 

function compute() {
    let expression = screen.value;
    let result;

    try {
        result = evaluateExpression(expression);
        screen.value = result;
    } catch (error) {
        screen.value = 'Error';
    }
}

function evaluateExpression(expression) {
   
    let tokens = expression.match(/(\d+|\+|\-|\*|\/|\%|\^|\(|\))/g);
  
    let operandStack = [];
    let operatorStack = [];
  
    const precedence = {
        '+': 1,
        '-': 2,
        '*': 3,
        '/': 4,
        '%': 5, 
        '^': 6
    };

    const performOperation = () => {
        let operator = operatorStack.pop();
        let operand2 = parseFloat(operandStack.pop());
        let operand1 = parseFloat(operandStack.pop());

        switch (operator) {
            case '+':
                operandStack.push(operand1 + operand2);
                break;
            case '-':
                operandStack.push(operand1 - operand2);
                break;
            case '*':
                operandStack.push(operand1 * operand2);
                break;
            case '/':
                if (operand2 === 0) {
                    throw new Error('Division by zero');
                }
                operandStack.push(operand1 / operand2);
                break;
            case '%':
                operandStack.push(operand1 % operand2); 
                break;
            case '^':
                operandStack.push(Math.pow(operand1, operand2));
                break;
        }
    };

   
    for (let token of tokens) {
        if (!isNaN(token)) {
         
            operandStack.push(token);
        } else if (token === '(') {
           
            operatorStack.push(token);
        } else if (token === ')') {
            
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                performOperation();
            }
          
            operatorStack.pop();
        } else {
            
            while (operatorStack.length > 0 && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
                performOperation();
            }
          
            operatorStack.push(token);
        }
    }

   
    while (operatorStack.length > 0) {
        performOperation();
    }

  
    return operandStack.pop();
}

function sin()
{
    screen.value=Math.sin(screen.value);
}
function cos()
{
    screen.value=Math.cos(screen.value);
}
function tan()
{
    screen.value=Math.tan(screen.value);
}
function pow()
{
    screen.value=Math.pow(screen.value,2);
}
function sqrt()
{
    screen.value=Math.sqrt(screen.value,2);
}
function log()
{
    screen.value=Math.log(screen.value);
}
function pi()
{
    screen.value=3.14159265359;
}
function e()
{
    screen.value=2.71828182846;
}
function fact()
{
    var i, num, f;
    f=1;
    num=screen.value;
    for(i=1; i<=num; i++)
    {
        f=f*i;
    }
    i=i-1;
    screen.value=f;
}
function backspc()
{
    screen.value = screen.value.slice(0, -1);
}
