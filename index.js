let calcScreen = document.getElementById('calcscrnums');
let currVal = null,
    firstVal = null,
    secondVal = null,
    operator = null,
    calcResult = null;

let calcButtons = document.getElementsByClassName('calcbutton');

for (const elem of calcButtons) {
    let testepic = elem.getAttribute('value');
    elem.addEventListener('click', e => {
        if (calcResult != null) {
            calcScreen.innerText = '';
            calcResult = null;
        }

        if (Number.isInteger(Number.parseInt(testepic))) {
            calcScreen.innerText += testepic;
            currVal = calcScreen.innerText;
        } else if (testepic === '+') {
            operatorCall('+');
        } else if (testepic === '-') {
            operatorCall('-');
        } else if (testepic === '*') {
            operatorCall('*');
        } else if (testepic === '/') {
            operatorCall('/');
        } else if (testepic === '=') {
            if (firstVal != null && operator != null) {
                secondVal = Number.parseFloat(currVal);
                calcResult = calcEval();
                calcScreen.innerText = calcResult;
                currVal = null;
                firstVal = null;
                secondVal = null;
                operator = null;
            }
        } else if (testepic === 'C') {
            calcScreen.innerText = '';
            currVal = null;
            firstVal = null;
            secondVal = null;
            operator = null;
            calcResult = null;
        }
    })
}

function operatorCall(operation) {
    if (!isNaN(Number.parseFloat(currVal)) && firstVal === null) {
        firstVal = Number.parseFloat(currVal);
        calcScreen.innerText = '';
    }
    operator = operation;
}

function calcEval() {
    if (operator === '+') {
        return firstVal + secondVal;
    } else if (operator === '-') {
        return firstVal - secondVal;
    } else if (operator === '*') {
        return firstVal * secondVal;
    } else if (operator === '/') {
        return firstVal / secondVal;
    }
}