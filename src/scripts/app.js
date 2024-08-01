document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];

  let isGameOver = false;

  function createBoard() {
    const allBombs = Array(bombAmount).fill("bomb");
    const allEmpty = Array(width * width - bombAmount).fill("empty");

    const allBoxes = allEmpty.concat(allBombs);

    const allShuffled = allBoxes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; ++i) {
      const square = document.createElement("div");

      square.setAttribute("id", i);
      square.classList.add(allShuffled[i]);

      grid.appendChild(square);
      squares.push(square);

      square.addEventListener("click", function (e) {
        click(square);
      });

      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    for (let i = 0; i < squares.length; ++i) {
      let total = 0;

      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("empty")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        if (
          i > width - 1 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        if (i > width && squares[i - width].classList.contains("bomb")) total++;
        if (
          i > width + 1 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;

        if (
          i < width * width - 2 &&
          !isRightEdge &&
          squares[i + 1].classList.contains("bomb")
        )
          total++;
        if (
          i < width * width - width &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < width * width - width - 2 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < width * width - width - 1 &&
          squares[i + width].classList.contains("bomb")
        )
          total++;

        squares[i].setAttribute("data", total);
      }
    }
  }

  createBoard();

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "F";
        flags++;

        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    }
  }

  function click(square) {
    let currentId = square.id;

    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;
    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }

      checkSquare(square, currentId);
    }

    square.classList.add("checked");
  }

  function checkSquare(square, currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[+currentId - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width - 1 && !isRightEdge) {
        const newId = squares[+currentId + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width) {
        const newId = squares[+currentId - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width + 1 && !isLeftEdge) {
        const newId = squares[+currentId - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * width - 2 && !isRightEdge) {
        const newId = squares[+currentId + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * width - width && !isLeftEdge) {
        const newId = squares[+currentId - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * width - width - 2 && !isRightEdge) {
        const newId = squares[+currentId + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * width - width - 1 && !isRightEdge) {
        const newId = squares[+currentId + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 15);
  }

  function gameOver(square) {
    isGameOver = true;

    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "B";
      }
    });
  }

  function checkForWin() {
    let matches = 0;

    for (let i = 0; i < squares.length; ++i) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
    }

    if (matches === bombAmount) {
      alert("You Won");
      isGameOver = true;
    }
  }
});