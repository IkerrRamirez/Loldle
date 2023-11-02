const gridContainer = document.querySelector(".guess-content");
const messageElement = document.getElementById("message");
const resetButton = document.querySelector(".reset");
const enterButton = document.querySelector(".enter-button");
const keyboardButtons = document.querySelectorAll(".keyboard-button");

let rows;
let currentRow;
let squares;

const wordsToGuess = ["APPLE", "BEACH", "CHAIR","DANCE", "EARTH","FLAME","GRAPE","HOTEL", "JEANS", "KNIFE", "LEMON", "MUSIC", "OLIVE", "PEACH", "QUEEN", "RIVER", "SMILE", "TIGER", "UMBRA", "WATER" ];

let words = [];
let currentRowIndex = 0;
let currentWordIndex = 0;
let currentI;

let isEnterPressed = false;
let win = false;

let choosenWord = "";
let message = "";

document.querySelector(".reset").addEventListener("click", resetGame);
enterButton.addEventListener("click", validateLetters);

addKeyboardListeners();
createGrid();
startNewGame();

function startNewGame() {
    console.log(currentRowIndex);
    win = false;
    currentI = 0;
    currentRowIndex = 0;
    rows = gridContainer.querySelectorAll(".row");
    currentRow = rows[currentRowIndex];
    squares = currentRow.querySelectorAll(".square");
  
    updateMessage("");
    loadWordToGuess();
  }
  
  function resetGrid() {
    keyboardButtons.forEach((button) => {
      button.style.backgroundColor = "";
      button.style.color = "black";
    });
  
    rows.forEach((row) => {
      const squaresInRow = row.querySelectorAll(".square");
      squaresInRow.forEach((square) => {
        square.textContent = "";
        square.classList.remove("yellow", "green", "grey");
      });
    });
  }
  
  function validateLetters() {
    let letter;
    let state = "";
    if(currentI <4) {
        return;
    }
    for (currentI = 0; currentI < squares.length; currentI++) {
      letter = squares[currentI].textContent;
  
      if (letter == choosenWord[currentI]) {
        squares[currentI].classList.add("green");
        state = "green";
        updateKeyboardButtonState(state, letter);
      } else if (choosenWord.includes(letter)) {
        squares[currentI].classList.add("yellow");
        state = "rgb(221, 189, 102)";
        updateKeyboardButtonState(state, letter);
      } else {
        squares[currentI].classList.add("grey");
        state = "grey";
        updateKeyboardButtonState(state, letter);
      }
  
      if (words.join("") === choosenWord) {
        console.log("has ganado");
        win = true;
      } else if (currentRowIndex >= 5) {
        showPopup("The choosen word was: " + choosenWord);
        console.log("has perdido");
      }
    }
    if (words.length === 0) {
      return;
    }
  
    if (currentI >= 4) {
      currentRowIndex++;
      if (currentRowIndex < 6) {
        currentRow = rows[currentRowIndex];
        squares = currentRow.querySelectorAll(".square");
      }
      words = [];
    }
  }
  

function updateMessage(text) {
  messageElement.textContent = text;
}

function loadWordToGuess() {
  const index = Math.floor(Math.random() * wordsToGuess.length);
  const guessWord = wordsToGuess[index];
  choosenWord = guessWord;
}

function createGrid() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < 5; j++) {
      const square = document.createElement("div");
      square.className = "square";
      row.appendChild(square);
    }
    gridContainer.append(row);
  }
}



function updateKeyboardButtonState(state, letter) {
  keyboardButtons.forEach((btn) => {
    if (btn.textContent === letter) {
      btn.style.backgroundColor = `${state}`;
      if (state != "yellow") {
        btn.style.color = "white";
      }
    }
  });
}

function addKeyboardListeners() {
  keyboardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const letter = this.textContent;

      if (!win) {
        for (currentI = 0; currentI < squares.length; currentI++) {
          if (squares[currentI].textContent === "") {
            squares[currentI].textContent = letter;
            words.push(letter);

            break;
          }
        }

        if (currentRowIndex < 6) {
          if (currentRowIndex === 5 && words.join("") === choosenWord) {
            message = "You Win!";
            win = true;
          }
        }
        messageElement.textContent = message;
      }
    });
  });
}

function resetGame() {
  resetGrid();
  startNewGame();
}

document.addEventListener("keydown", function (event) {
  if (!win) {
    if (currentRowIndex < 6) {
      if (event.key.match(/^[a-zA-Z]$/)) {
        const letter = event.key.toUpperCase();
        for (currentI = 0; currentI < squares.length; currentI++) {
          if (squares[currentI].textContent === "") {
            squares[currentI].textContent = letter;
            words.push(letter);

            break;
          }
        }
      } else if (event.key === "Enter") {
        validateLetters();
      } else if (event.key === "Backspace") {
        for (currentI = squares.length - 1; currentI >= 0; currentI--) {
          if (squares[currentI].textContent !== "") {
            squares[currentI].textContent = "";
            words.pop();
            break;
          }
        }
      }
    }
  }
});

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = message;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

document.getElementById("close-popup").addEventListener("click", closePopup);

