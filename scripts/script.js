const wordLetters = document.getElementById("word-letters");
const alphabet = document.getElementById("alphabet");
const letterButtons = document.querySelectorAll(".button");
const deadMessage = document.getElementById("dead-message");
const winMessage = document.getElementById("win-message");
const linesContainer = document.getElementById("lines");
const counterr = document.getElementById("counter");
const square = document.getElementById("square");
const myImage = document.getElementById("hangman-img");
const playAgain = document.getElementById("play-again-btn");
deadMessage.style.display = "none";
winMessage.style.display = "none";

async function fetchData() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await response.json();
  let word = data[0];

  console.log(word); //SELECTED WORD

  const wordLength = word.length;

  let line;

  for (let i = 0; i < word.length; i++) {
    line = document.createElement("p");

    line.textContent = "_";
    wordLetters.appendChild(line);
    line.id = i;
    line.classList.add("line");
    linesContainer.appendChild(line);
  }

  let counter = 10;
  counterr.textContent = `You have ${counter} lifes `;

  let lines = document.querySelectorAll(".line");
  let counterCue = [];

  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener("click", function () {
      letterButtons[i].disabled = true;
      let checkLetter = letterButtons[i].textContent;

      for (let j = 0; j < word.length; j++) {
        const wordLetter = word[j];

        // console.log(wordLetter); //THE CURRENT LETTER OF SELECTED WORD

        if (checkLetter === wordLetter) {
          // console.log(checkLetter); // THE CURRENT CLICKED LETTER

          for (m = 0; m < lines.length; m++) {
            if (lines[m].id == j) {
              lines[m].textContent = checkLetter;
              counterCue.push(1);
            }
          }
        } else {
          counterCue.push(0);
        }
      }

      if (!counterCue.includes(1)) {
        counter--;
      }

      counterCue = [];
      let correctLines = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].textContent != "_") {
          correctLines++;
        }
      }
      // console.log(correctLines); // NUMBER OF CORRECT LETTERS
      console.log(counter);
      counterr.textContent = `You have ${counter} lifes left`;

      if (counter == 9) {
        square.classList.add("square");
      } else if (counter == 8) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
      } else if (counter == 7) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
      } else if (counter == 6) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/6.png";
      } else if (counter == 5) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/5.png";
      } else if (counter == 4) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/4.png";
      } else if (counter == 3) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/3.png";
      } else if (counter == 2) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/2.png";
      } else if (counter == 1) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/1.png";
      } else if (counter == 0) {
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/0.png";
      } else if (counter < 0) {
        counterr.textContent = `You have 0 lifes left`;
        square.classList.add("square");
        square.style.borderTop = "2px solid black";
        square.style.borderRight = "2px solid black";
        myImage.src = "./images/0.png";
      } else {
        square.classList = [];
        myImage.src = "";
        myImage.src = "./images/start.png";

      }
      if (counter == 0 && correctLines != lines.length) {
        deadMessage.style.display = "block";
        console.log("here");
      } else if (counter == 10 && correctLines == lines.length) {
        winMessage.style.display = "block";
        counterr.style.display = "none";
        myImage.src = "./images/win.png";
      }
    });
  }
}

fetchData();
playAgain.addEventListener("click", function () {
  location.reload();
});
