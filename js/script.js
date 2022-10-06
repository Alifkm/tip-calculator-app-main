// formula:
// tip amount / person = (bill x tip) / people
// total / person = ((bill x tip) + bill) / people

document.addEventListener("DOMContentLoaded", function() {  

  billInput.addEventListener('keyup', function(e) {
    calculation.bill = parseFloat(e.target.value);
    errorMsgFunc(billInput, 'bill', 0);
  });

  peopleInput.addEventListener('keyup', function(e) {
    calculation.people = parseInt(e.target.value);
    errorMsgFunc(peopleInput, 'people', 1);
  });

  for(let button of tipButton) {
    button.addEventListener('click', function() {
      customTip.value = "";
      removeClassButton();
      button.classList.add('active');
      calculation.tip = parseInt(button.innerText) / 100;
      document.dispatchEvent(new Event(CALCULATE));
    }); 
  };

  customTip.addEventListener('keyup', function(e) {
    removeClassButton();
    calculation.tip = parseInt(e.target.value) / 100;
    if(!customTip.value) {
      calculation.tip = 0;
    }
    document.dispatchEvent(new Event(CALCULATE));
  });

  resetButton.addEventListener('click', function() {
    removeClassButton();
    resetCalculation();
    document.dispatchEvent(new Event(CALCULATE));
  })
});

const calculation = {
  bill: 0,
  tip: 0,
  people: 0
}

const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButton = document.getElementsByClassName('button-tip');
const customTip = document.getElementById('custom-input');
const resetButton = document.getElementById('reset');
const errorMsg = document.getElementsByClassName('error-msg');

const CALCULATE = "calculate";

document.addEventListener(CALCULATE, function() {
  const tipAmount = document.getElementById('tip-amount');
  const total = document.getElementById('total');
  
  if((billInput.value && peopleInput.value && calculation.tip != 0)) {
    tipAmount.innerText = `$${Math.round((calculation.bill * calculation.tip) / calculation.people * 100) / 100}`;
    total.innerText = `$${Math.round(((calculation.bill * calculation.tip) + calculation.bill) / calculation.people * 100) / 100}`; 
  }else {
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
  }
});

const resetCalculation = function () {
  calculation.bill = 0;
  calculation.tip = 0;
  calculation.people = 0;
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
}

const removeClassButton = () =>  {
  for(let button of tipButton) {
    button.classList.remove('active');
  }
}

const errorMsgFunc = function (input, type, index) {
  if(calculation[type] < 1) {
    errorMsg[index].style.display = 'flex';
    errorMsg[index].classList.add('error-msg-active');
    input.classList.add('input-error');
  }else {
    errorMsg[index].classList.remove('error-msg-active');
    errorMsg[index].style.display = 'none';
    input.classList.remove('input-error');
    document.dispatchEvent(new Event(CALCULATE));
  }
}