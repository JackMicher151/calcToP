let calcScreen = document.getElementById('calcscrnums');
let calcEquation = document.getElementById('calcscrequation');
let currVal = null,
    firstVal = null,
    secondVal = null,
    operator = null,
    calcResult = null;

let calcButtons = document.getElementsByClassName('calcbutton');

let motion = document.querySelector("#motiontoggle > input[type='checkbox']");
let bgOverlay = document.getElementById('calcbodybackground2');

motion.addEventListener('change', e => {
    if(motion.checked) {
        bgOverlay.style.opacity = 0;
    } else {
        bgOverlay.removeAttribute('style');
    }
})

for (const elem of calcButtons) {
    elem.addEventListener('click', e => {
        let testepic = elem.getAttribute('value');
        
        // if (calcResult != null) {
        //     calcScreen.innerText = '';
        //     calcResult = null;
        // }

        if (calcResult === '🖕'){
            calcScreen.innerText = '';
            calcResult = null;
        }

        if (Number.isInteger(Number.parseInt(testepic))) {
            if(calcResult != null) {
                calcScreen.innerText = '';
                calcResult = null;
            }
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
        } else if (testepic === 'neg' && calcResult === null) {
            if (calcScreen.innerText.includes('-')) {
                calcScreen.innerText = calcScreen.innerText.replace('-', '');
            } else {
                calcScreen.innerText = '-' + calcScreen.innerText;
            }
            currVal = calcScreen.innerText;
        } else if (testepic === '.' && calcResult === null){
            if (calcScreen.innerText.includes('.')) {
                calcScreen.innerText = calcScreen.innerText.replace('.','');
            } else {
                calcScreen.innerText = calcScreen.innerText + '.';
            }
            currVal = calcScreen.innerText;
        } else if (testepic === '=') {
            if (firstVal != null && operator != null) {
                decimalCheck();
                secondVal = Number.parseFloat(currVal);
                calcResult = calcEval();
                calcScreen.innerText = calcResult;
                currVal = null;
                firstVal = null;
                secondVal = null;
                operator = null;
                calcEquation.innerText = '';
            }
        } else if (testepic === 'C') {
            calcScreen.innerText = '';
            currVal = null;
            firstVal = null;
            secondVal = null;
            operator = null;
            calcResult = null;
            calcEquation.innerText = '';
        }
    })

    elem.addEventListener('mousedown', () => {
        elem.style.backgroundColor = 'rgb(12, 39, 51)';
        elem.style.boxShadow = 'inset 0 0 7px 2px rgb(29, 191, 255)';
    })

    elem.addEventListener('mouseup', () => {
        elem.removeAttribute('style');
    })

    elem.addEventListener('mouseleave', () => {
        elem.removeAttribute('style');
    })
}

function operatorCall(operation) {
    if (calcResult != null) {
        firstVal = calcResult;
        calcResult = null;
        calcScreen.innerText = '';
    }

    decimalCheck();

    if (!isNaN(Number.parseFloat(currVal)) && firstVal === null) {
        firstVal = Number.parseFloat(currVal);
        calcScreen.innerText = '';
    }

    if (firstVal != null) {
        calcEquation.innerText = firstVal + ' ' + operation;
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
        if (secondVal === 0) {
            return '🖕';
        } else {
            return firstVal / secondVal;
        }
    }
}

function decimalCheck() {
    if (calcScreen.innerText[-1] === '.'){
        calcScreen.innerText = calcScreen.innerText.replace('.','')
    }
}
