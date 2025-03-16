let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let count = 0; // Track number of moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Box Click Event
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent changing already filled boxes

    if (turnO) {
      box.innerText = "O";
      box.style.color = "#3498db";
    } else {
      box.innerText = "X";
      box.style.color = "#e74c3c";
    }

    box.disabled = true;
    turnO = !turnO;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#c7e1ff"; // Reset background color
  });
};

// Highlight Winning Boxes
const highlightWinner = (winPattern) => {
  winPattern.forEach((index) => {
    boxes[index].style.backgroundColor = "#2ecc71"; // Green for winners
  });
};

const showWinner = (winner, winPattern) => {
  msg.innerText = `Congratulations! ${winner} wins!`;
  msgContainer.classList.remove("hide");
  highlightWinner(winPattern);
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val, pattern);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
