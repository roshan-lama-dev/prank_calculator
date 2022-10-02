// Geab all the values from the button as an array
// Loop through them and add event listener to each element
// When element are clicked then get the buttons innerText and store them in some variable
// grab the disaply element
// and create a function to display clikced text to the disaplay element

// if you dont insatnticat the value is undefined
// let clickedVal = "";
// const btnArray = Array.from(document.querySelectorAll(".btn"));
// const displayElm = document.querySelector(".display");
// btnArray.map((item, index) => {
//   //   console.log(item.innerText);

//   //   item is the whole elements from the html
//   // we are mapping the every elements and add onclick listener
//   item.addEventListener("click", () => {
//     clickedVal += item.innerHTML;
//     console.log(clickedVal);
//     display(clickedVal);

//     switch (item.innerHTML) {
//       case "AC":
//         clickedVal = "";
//         displayElm.textContent = "0.00";

//       case "+":
//     }
//   });
// });

// const display = (str) => {
//   displayElm.innerText = str;
// };

// const add = (a, b) => {
//   a + b;
// };

// Select all the div by using the class
const buttons = document.querySelectorAll(".btn");

const audio = new Audio("a.wav");

//Now need to make the buttons clickable // so loop through the every element
// to loop through the div we need to add them in an array

const btnArray = Array.from(buttons);

const displayArea = document.querySelector(".display");

let textFromButton = "";

const operator = ["%", "/", "*", "-", "+"];

let lastOpeartorTOUse = "";

// Node list is not an array and cannot be lopped throug
btnArray.map((btnValue) => {
  console.log(btnValue);

  //   Reset  the styling and removeing the added class of prank
  btnValue.addEventListener("click", () => {
    const val = btnValue.innerText;

    displayArea.style.background = "";
    displayArea.style.color = "";
    displayArea.classList.remove("prank");
    if (val === "AC") {
      textFromButton = "";
      return displayTheText();
    }
    if (val === "C") {
      const lastOperator = textFromButton.substring(
        0,
        textFromButton.length - 1
      );

      textFromButton = lastOperator;
      return displayTheText(textFromButton);
    }

    if (val === "=") {
      const lastOperator = textFromButton.substring(textFromButton.length - 1);

      if (operator.includes(lastOperator)) {
        // alert("Stop");
        textFromButton = textFromButton.substring(0, textFromButton.length - 1);
        // total();
        // return;
      }
      return total();
    }

    if (operator.includes(val)) {
      lastOpeartorTOUse = val;
      console.log("Operator clicked");
      if (!textFromButton) {
        return;
      }

      const lastOperator = textFromButton.substring(textFromButton.length - 1);

      if (operator.includes(lastOperator)) {
        // alert("Stop");
        textFromButton = textFromButton.substring(0, textFromButton.length - 1);
        // total();
        // return;
      }
    }

    if (val === ".") {
      if (lastOpeartorTOUse) {
        const lastIndexOfOperator =
          textFromButton.lastIndexOf(lastOpeartorTOUse);
        const lastNumberSet = textFromButton.slice(lastIndexOfOperator + 1);
        if (lastNumberSet.includes(".")) return;
      }
      // 1st handling
      if (!lastOpeartorTOUse && textFromButton.includes(".")) {
        return;
      }
    }

    //Concat the clicked elements for displaying
    textFromButton += val;
    // Invoke the display function and pass the concated string as a parameter
    displayTheText(textFromButton);
    // store the individual innerText to a global variable
  });
});

const displayTheText = (string) => {
  displayArea.innerText = string || "0.00";
};

const total = () => {
  const extra = randomNumber();
  if (extra > 0) {
    displayArea.style.background = "red";
    displayArea.style.color = "white";
    displayArea.classList.add("prank");
    audio.play();
  }
  const ttl = eval(textFromButton) + extra;

  //   cannot send the value directly need to assign the value to the empty string
  textFromButton = ttl.toString();
  displayTheText(textFromButton);
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  //   less than three return 3 other wise return 0
  return num < 10 ? num : 0;
};
