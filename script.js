// JAVASCRIPT file for the CALCULATOR App - (created by - Swadesh Shivam)


//Variable declarations and initializations

//Putting all the data numbers(from 0 to 9 including'.') into numberButtons array
const numberButtons = document.querySelectorAll("[data-number]");

//Putting all the operations available in the developed calculator into operationButtons array
const operationButtons = document.querySelectorAll("[data-operation]");

//Putting equals, all clea, delete, previous operand and next operand elements into the mentioned variables
const equalsBtn = document.querySelector("[data-equals]");
const dltBtn = document.querySelector("[data-delete]");
const allClrBtn = document.querySelector("[data-all-clear]");
const prevOprTxtElem = document.querySelector("[data-previous-operand]");
const currOprTxtElem = document.querySelector("[data-current-operand]");


//Creating Calculator class which consists of a constructor to create the object when previous and next data is provided and performs a wide variety of functions such as clear(), delete(), appendNumber(), chooseOperation(), compute(),  getDisplayNumber() and updateDisplay()
class Calculator {
    
    //Creating constructor for Calculator to create objects which takes previous and next operands as respective attributes
    constructor(prevOprTxtElem, currOprTxtElem) {
      this.prevOprTxtElem = prevOprTxtElem;
      this.currOprTxtElem = currOprTxtElem;
      this.clear();
    }
  
    
    //clear() function gets triggered on clicking 'AC' on the calculator. It updates the prev and current operands as null and the operation as undefined
    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;
    }
  
    //delete() function gets triggered on clicking 'DEL' on the calculator. It deletes the MSB from the current number by slicing off the last digit
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    //appendNumber() function concatenates the number clicked on the calculator to the existing current operand and updates the current operand
    appendNumber(number) {
      
      //Checking if the number clicked is '.' and if it is already present in the current operand, then we simply return  
      if (number === "." && this.currentOperand.includes(".")) {
        return;
      }
  
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    

    //chooseOperation() determines what operation is clicked by the user and then uses the previous and current operands and the compute function to compute the final result. The previous operand is updated with current operand, the current operand is updated with null
    chooseOperation(operation) {
      if (this.currentOperand === "") {
        return;
      }
  
      if (this.previousOperand !== "") {
        this.compute();
      }
  
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
   
    //compute() function computes the result based on the operation provided and updates the result in current operand
    compute() {
        //Declaring res variable to store the result of the computation
      let res;
      //Converting pevious and current operands from string to float and stroring them into prev and curr variables
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
  
      
      //Checking if either the prev or curr is not a number(NaN), then simply return. No computation is required.
      if (isNaN(prev) || isNaN(curr)) {
        return;
      }
  
      //Performing switch operation and computing the result based on the operation chosen
      switch (this.operation) {
        case "+":
          res = prev + curr;
          break;
        case "-":
          res = prev - curr;
          break;
        case "*":
          res = prev * curr;
          break;
        case "/":
          res = prev / curr;
          break;
        case "%":
          res = prev % curr;
          break;
        //If none of the operations from the above is chosen, then its an invalid operation for our calculator designed. So simply return  
        default:
          return;
      }
      //Updating res value in current operand
      this.currentOperand = res;
      //Updating operation as undefined
      this.operation = undefined;
      //Updating previous operand as null
      this.previousOperand = "";
    }
    
    //Displaying the result in standard format with commas and everything.
    getDisplayNumber(number) {
      const stringNum = number.toString();
      //Splitting the number converted to string at the decimal('.'). Thus we've integer part at 0th index and decimal part at 1st index
      const intDigits = parseFloat(stringNum.split(".")[0]);
      const decDigits = stringNum.split(".")[1];
  
      let displayRes;
      if (isNaN(intDigits)) {
        displayRes = "";
      } else {
        displayRes = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
      }
      if (decDigits != null) {
        return `${displayRes}.${decDigits}`;
      } else {
        return displayRes;
      }
    }
    
    //ipdateDisplay() function updates the final result and displays it on the display area
    updateDisplay() {
      this.currOprTxtElem.innerText = this.getDisplayNumber(this.currentOperand);
      //Concatenating the operation sign in the previous operand as we move further in the calculation
      if (this.operation != null) {
        this.prevOprTxtElem.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
      } else {
        this.prevOprTxtElem.innerText = "";
      }
    }
  }

//Creating calculator object from the above created Calculator class
const calculator = new Calculator(prevOprTxtElem, currOprTxtElem);

//Appending the clicked number button on the calculator into "calculator" object and updating the display area
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//Based on the operation clicked on the calculator, computing the result and updating the result on the display area
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//When equals button is clicked on the calculator, computing the result of the operation from previous and current operands and updating the result on the display area
equalsBtn.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

//When AC(all clear) button is clicekd on the calculator, clearing the display area and updating the result on the display area
allClrBtn.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});


//When DEL(delete) button is clicked on the calculator, deleting the LSB of the current number and updating hr final result on the display area
dltBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
