const displayText = document.querySelector('#display');
const numButtons = document.getElementsByClassName('num');
const clearBut = document.querySelector('#clear-but');
const plusBut = document.querySelector('#plus-but');
const divideBut = document.querySelector('#divide-but');
const minusBut = document.querySelector('#minus-but');
const multipleBut = document.querySelector('#multiple-but');
const equalBut = document.querySelector('#equal-but');
const floatPointBut = document.querySelector('#float-point');
const plusMinusBut = document.querySelector('#plusminus-but');

let number = '';
let calcArr = [];
let operationIs = '';
let temp;

function changeIndex() {
	if (calcArr[0] == '/' || calcArr[0] == '+' || calcArr[0] == '*' || calcArr[0] == '-') {
		temp = calcArr[0];
		calcArr[0] = calcArr[1];
		calcArr[1] = temp;
	}
}

function operationPart() {
	displayText.innerText = number;
	number = '';
	calcArr.splice(0, 3);
	changeIndex();
}

function allOperations() {
	if (calcArr.length > 2) {
		if (calcArr[1] == '+') {
			operationIs = '';
			if (isFloat() === true) {
				parseFloatFunc();
			} else {
				newNum = (parseInt(calcArr[0]) + parseInt(calcArr[2])).toString();
				if (isFloatNum(newNum) == true) {
					newNum = parseFloat(newNum).toFixed(4).toString();
					calcArr.push(newNum);
					number = `${(parseInt(calcArr[0]) + parseInt(calcArr[2])).toFixed(4)}`;
				} else {
					calcArr.push(newNum);
					number = `${parseInt(calcArr[0]) + parseInt(calcArr[2])}`;
				}
			}
			operationPart();
		} else if (calcArr[1] == '/') {
			operationIs = '';
			if (isFloat() === true) {
				parseFloatFunc();
			} else {
				newNum = (parseInt(calcArr[0]) / parseInt(calcArr[2])).toString();
				if (isFloatNum(newNum) == true) {
					newNum = parseFloat(newNum).toFixed(4).toString();
					calcArr.push(newNum);
					number = `${(parseInt(calcArr[0]) / parseInt(calcArr[2])).toFixed(4)}`;
				} else {
					calcArr.push(newNum);
					number = `${parseInt(calcArr[0]) / parseInt(calcArr[2])}`;
				}
			}
			operationPart();
		} else if (calcArr[1] == '-') {
			operationIs = '';
			if (isFloat() === true) {
				parseFloatFunc();
			} else {
				newNum = (parseInt(calcArr[0]) - parseInt(calcArr[2])).toString();
				if (isFloatNum(newNum) == true) {
					newNum = parseFloat(newNum).toFixed(4).toString();
					calcArr.push(newNum);
					number = `${(parseInt(calcArr[0]) - parseInt(calcArr[2])).toFixed(4)}`;
				} else {
					calcArr.push(newNum);
					number = `${parseInt(calcArr[0]) - parseInt(calcArr[2])}`;
				}
			}
			operationPart();
		} else if (calcArr[1] == '*') {
			operationIs = '';
			if (isFloat() === true) {
				parseFloatFunc();
			} else {
				newNum = (parseInt(calcArr[0]) * parseInt(calcArr[2])).toString();
				if (isFloatNum(newNum) == true) {
					newNum = parseFloat(newNum).toFixed(4).toString();
					calcArr.push(newNum);
					number = `${(parseInt(calcArr[0]) * parseInt(calcArr[2])).toFixed(4)}`;
				} else {
					calcArr.push(newNum);
					number = `${parseInt(calcArr[0]) * parseInt(calcArr[2])}`;
				}
			}
			operationPart();
		}
		reduceSize();
	}
}

function numToZero() {
	operationIs = '';
	number = '';
}

function equalOperation() {
	if (calcArr[1] == '/' || calcArr[1] == '+' || calcArr[1] == '*' || calcArr[1] == '-') {
		if (number != '' && number != '-') {
			calcArr.push(number);
			operationIs = calcArr[1];
			calcArr.push(operationIs);
			isFloat();
		}
		numToZero();
		allOperations();
	}
}

function plusOperation() {
	if (number != '' && number != '-') {
		calcArr.push(number);
		operationIs = '+';
		calcArr.push(operationIs);
		isFloat();
	}
	allOperations();
	if (calcArr[1] == '/' || calcArr[1] == '*' || calcArr[1] == '-') {
		calcArr[1] = '+';
	}
	numToZero();
}

function divisionOperation() {
	if (number != '' && number != '-') {
		calcArr.push(number);
		operationIs = '/';
		calcArr.push(operationIs);
		isFloat();
	}
	allOperations();
	if (calcArr[1] == '+' || calcArr[1] == '*' || calcArr[1] == '-') {
		calcArr[1] = '/';
	}
	numToZero();
}

function multipleOperation() {
	if (number != '' && number != '-') {
		calcArr.push(number);
		operationIs = '*';
		calcArr.push(operationIs);
		isFloat();
	}
	allOperations();
	if (calcArr[1] == '+' || calcArr[1] == '/' || calcArr[1] == '-') {
		calcArr[1] = '*';
	}
	numToZero();
}

function subtractOperation() {
	if (number != '' && number != '-') {
		calcArr.push(number);
		operationIs = '-';
		calcArr.push(operationIs);
		isFloat();
	}
	allOperations();
	if (calcArr[1] == '+' || calcArr[1] == '*' || calcArr[1] == '/') {
		calcArr[1] = '-';
	}
	numToZero();
}

function isContainNumber() {
	if (number.length == 1 && number[0] == '-') {
		return true;
	} else {
		return false;
	}
}

function clearDisplay() {
	if (clearBut.innerText == 'C') {
		number = '0';
		displayText.innerText = '0';
	}
	if (clearBut.innerText == 'AC') {
		number = '0';
		calcArr = [];
		operationIs = '';
		displayText.innerText = '0';
	}
}

function changeClearBut() {
	if (displayText.innerText == '0' || number == '0' || displayText.innerText.length == 0 || calcArr == []) {
		clearBut.innerText = 'AC';
	} else {
		clearBut.innerText = 'C';
	}
}

function isFloatNum(arg) {
	if (arg.includes('.')) {
		return true;
	}
	return false;
}

function isFloat() {
	for (let i in calcArr) {
		if (calcArr[i].includes('.')) {
			return true;
		}
	}
	return false;
}

function parseFloatFunc() {
	if (calcArr[1] == '+') {
		calcArr.push((parseFloat(calcArr[0]) + parseFloat(calcArr[2])).toFixed(4).toString());
		number = `${(parseFloat(calcArr[0]) + parseFloat(calcArr[2])).toFixed(4)}`;
	} else if (calcArr[1] == '/') {
		calcArr.push((parseFloat(calcArr[0]) / parseFloat(calcArr[2])).toFixed(4).toString());
		number = `${(parseFloat(calcArr[0]) / parseFloat(calcArr[2])).toFixed(4)}`;
	} else if (calcArr[1] == '-') {
		calcArr.push((parseFloat(calcArr[0]) - parseFloat(calcArr[2])).toFixed(4).toString());
		number = `${(parseFloat(calcArr[0]) - parseFloat(calcArr[2])).toFixed(4)}`;
	} else if (calcArr[1] == '*') {
		calcArr.push((parseFloat(calcArr[0]) * parseFloat(calcArr[2])).toFixed(4).toString());
		number = `${(parseFloat(calcArr[0]) * parseFloat(calcArr[2])).toFixed(4)}`;
	}
}

function convertFloat() {
	let counter = 0;
	for (let i = 0; i < number.length; i++) {
		if (number[i] == '.') {
			counter++;
		}
	}
	if (counter < 1 && number.length > 0) {
		number += '.';
		displayText.innerText = number;
	}
}

function intervalChange() {
	if (calcArr.length >= 1) {
		if (parseInt(calcArr[0]) > 0) {
			calcArr[0] = '-' + calcArr[0];
			displayText.innerText = calcArr[0];
		} else {
			calcArr[0] = calcArr[0].splice(0, 1);
			displayText.innerText = calcArr[0];
		}
	}
	if (number[0] != '-') {
		number = '-' + number;
		displayText.innerText = number;
	}
	else {
		number = number.slice(1, number.length);
		// number = number.substring(1);
		displayText.innerText = number;
	}
}

function addToNumber(e) {
	if (number.length < 9) {
		if (e.target.innerText == '0') {
			if (number[0] != '0' && number[1] != '0') {
				number += e.target.innerText;
				displayText.innerText = number;
				changeClearBut();
			}
		} else {
			number += e.target.innerText;
			displayText.innerText = number;
			changeClearBut();
		}
	}
}

function keyToNumber(e) {
	if (e.key == '0' || e.which == '96') {
		if (number[0] != '0' && number[1] != '0') {
			number += e.key;
			displayText.innerText = number;
			changeClearBut();
		}
	}
	else if (e.key >= '1' && e.key <= '9' && number.length < numButtons.length - 1) {
		number += e.key;
		displayText.innerText = number;
		changeClearBut();
	} else if (e.key === 'Backspace') {
		number = number.slice(0, -1);
		displayText.innerText = number;
		changeClearBut();
	} else if (e.which >= '97' && e.which <= '105' && number.length < numButtons.length - 1) {
		if (number.length < 1 && e.key != '96') {
			number += e.key;
			displayText.innerText = number;
			changeClearBut();
		} else if (number.length >= 1) {
			number += e.key;
			displayText.innerText = number;
			changeClearBut();
		}
	} else if (e.key === '+') {
		plusOperation();
	} else if (e.key === '-') {
		subtractOperation();
	} else if (e.key === '*') {
		multipleOperation();
	} else if (e.key === '/') {
		divisionOperation();
	} else if (e.key === '=') {
		equalOperation();
	} else if (e.key === '.') {
		convertFloat();
	} else if (e.key === 'c') {
		changeClearBut();
		clearDisplay();
	}
}

function reduceSize() {
	if (displayText.innerText.length > 15) {
		displayText.style.fontSize = '3rem';
	} else{
		displayText.style.fontSize = '4rem';
	}
}

for (let i = 0; i < numButtons.length; i++) {
	numButtons[i].addEventListener('click', addToNumber);
}

document.addEventListener('keydown', keyToNumber);
clearBut.addEventListener('click', clearDisplay);
clearBut.addEventListener('click', changeClearBut);
plusBut.addEventListener('click', plusOperation);
divideBut.addEventListener('click', divisionOperation);
minusBut.addEventListener('click', subtractOperation);
multipleBut.addEventListener('click', multipleOperation);
equalBut.addEventListener('click', equalOperation);
floatPointBut.addEventListener('click', convertFloat);
plusMinusBut.addEventListener('click', intervalChange);