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
        elem.style.backgroundColor = 'rgb(120,140,150)';
        elem.style.boxShadow = 'inset 0 0 10px 2px rgb(20, 80, 110)';
    })

    elem.addEventListener('mouseup', () => {
        elem.removeAttribute('style');
    })

    elem.addEventListener('mouseleave', () => {
        elem.removeAttribute('style');
    })
}

function operatorCall(operation) {
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