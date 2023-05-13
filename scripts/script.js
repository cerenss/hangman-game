const wordLetters = document.getElementById("word-letters");
const alphabet = document.getElementById("alphabet");
const letterButtons = document.querySelectorAll(".button");
const deadMessage = document.getElementById("dead-message");
const winMessage = document.getElementById("win-message");
const linesContainer = document.getElementById("lines");
const counterr = document.getElementById("counter");
const playAgain = document.getElementById("play-again-btn");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
console.log(canvas);
// Set line properties
c.strokeStyle = "black";
c.lineWidth = 2;

function lifes9() {
  // Draw a straight line on left 9 life
  c.beginPath();
  c.moveTo(3, 2);
  c.lineTo(3, 150);
  c.stroke();
}
function lifes8() {
  // Draw a straight line on top 8
  c.beginPath();
  c.moveTo(3, 3);
  c.lineTo(150, 3);
  c.stroke();
}
function lifes7() {
  //box square  7
  c.beginPath();
  c.moveTo(120, 125);
  c.lineTo(180, 125);
  c.lineTo(170, 180);
  c.lineTo(130, 180);
  c.lineTo(120, 125);
  c.stroke();
}
function lifes6() {
  // Draw Circle for head  6
  const centerX = 150;
  const centerY = 40;
  const radius = 10;
  c.beginPath();
  c.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  c.stroke();
}
function lifes5() {
  // 5 body line
  c.beginPath();
  c.moveTo(150, 110);
  c.lineTo(150, 50);
  c.stroke();
}
function lifes4() {
  //hands
  //4
  c.beginPath();
  c.moveTo(150, 50);
  c.lineTo(180, 60);
  c.stroke();
}
function lifes3() {
  //hands

  //3
  c.beginPath();
  c.moveTo(150, 50);
  c.lineTo(120, 60);
  c.stroke();
}
function lifes2() {
  //legs
  // 2
  c.beginPath();
  c.moveTo(150, 110);
  c.lineTo(180, 120);
  c.stroke();
  function lifes1() {}
  //legs
}
function lifes1() {
  // 1
  c.beginPath();
  c.moveTo(150, 110);
  c.lineTo(120, 120);
  c.stroke();
}
function lifes0() {
  //hanged 0
  c.beginPath();
  c.moveTo(150, 3);
  c.lineTo(150, 30);
  c.stroke();
}

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
        lifes9();
      } else if (counter == 8) {
        lifes8();
      } else if (counter == 7) {
        lifes7();
      } else if (counter == 6) {
        lifes6();
      } else if (counter == 5) {
        lifes5();
      } else if (counter == 4) {
        lifes4();
      } else if (counter == 3) {
        lifes3();
      } else if (counter == 2) {
        lifes2();
      } else if (counter == 1) {
        lifes1();
      } else if (counter == 0 || counter < 0) {
        counterr.textContent = `You have 0 lifes left`;
        c.clearRect(0, 0, canvas.width, canvas.height);
        lifes9();
        lifes8();
        lifes6();
        lifes5();
        lifes4();
        lifes3();
        lifes2();
        lifes1();
        lifes0();
        deadMessage.style.display = "block";
        for (let i = 0; i < letterButtons.length; i++) {
          letterButtons[i].disabled = true;
        }
      } else {
        winMessage.style.display = "block";
      }
      if (counter == 0 && correctLines != lines.length) {
        deadMessage.style.display = "block";
        console.log("here");
        for (let i = 0; i < letterButtons.length; i++) {
          letterButtons[i].disabled = true;
        }
      } else if (counter > 10 && correctLines == lines.length) {
        winMessage.style.display = "block";
        counterr.style.display = "none";
      }
    });
  }
}

fetchData();
playAgain.addEventListener("click", function () {
  location.reload();
});
