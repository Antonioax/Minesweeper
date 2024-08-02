document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".mine-grid");
  const width = 10;
  const bombAmount = 20;

  let flags = 0;
  let squares = [];
  let isGameOver = false;

  function createBoard() {
    const allSquares = generateSquares();
    const shuffledSquares = shuffleArray(allSquares);

    shuffledSquares.forEach((type, index) => {
      const square = createSquare(index, type);
      grid.appendChild(square);
      squares.push(square);
    });

    addNumbersToSquares();
  }

  function generateSquares() {
    const bombs = Array(bombAmount).fill("bomb");
    const empties = Array(width * width - bombAmount).fill("empty");
    return empties.concat(bombs);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function createSquare(index, type) {
    const square = document.createElement("div");
    square.setAttribute("id", index);
    square.classList.add(type);
    square.addEventListener("click", () => handleClick(square));
    square.oncontextmenu = (e) => {
      e.preventDefault();
      handleRightClick(square);
    };
    return square;
  }

  function addNumbersToSquares() {
    squares.forEach((square, index) => {
      if (square.classList.contains("empty")) {
        const total = countAdjacentBombs(index);
        square.setAttribute("data", total);
      }
    });
  }

  function countAdjacentBombs(index) {
    const isLeftEdge = index % width === 0;
    const isRightEdge = index % width === width - 1;
    let count = 0;

    const adjacentIndices = [
      index - 1, 
      index + 1 - width, 
      index - width, 
      index - 1 - width, 
      index + 1, 
      index - 1 + width, 
      index + 1 + width, 
      index + width, 
    ];

    adjacentIndices.forEach((newIndex) => {
      if (
        isValidIndex(newIndex) &&
        (isValidIndex(newIndex) || (!isLeftEdge && !isRightEdge)) &&
        squares[newIndex].classList.contains("bomb")
      ) {
        count++;
      }
    });

    return count;
  }

  function isValidIndex(index) {
    return index >= 0 && index < width * width;
  }

  function handleClick(square) {
    if (
      isGameOver ||
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;

    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      const total = parseInt(square.getAttribute("data"), 10);
      if (total !== 0) {
        square.classList.add("checked");
        square.innerHTML = total;
      } else {
        square.classList.add("checked");
        revealAdjacentSquares(square);
      }
    }
  }

  function revealAdjacentSquares(square) {
    const currentId = parseInt(square.id);
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    function revealSquare(id) {
      if (!isValidIndex(id)) return;
      const adjacentSquare = document.getElementById(id);
      if (
        adjacentSquare.classList.contains("checked") ||
        adjacentSquare.classList.contains("flag")
      )
        return;

      handleClick(adjacentSquare);
    }

    const adjacentPositions = [
      { offset: -1, condition: !isLeftEdge }, 
      { offset: 1 - width, condition: !isRightEdge },
      { offset: -width, condition: true }, 
      { offset: -1 - width, condition: !isLeftEdge }, 
      { offset: 1, condition: !isRightEdge },
      { offset: -1 + width, condition: !isLeftEdge },
      { offset: 1 + width, condition: !isRightEdge }, 
      { offset: width, condition: true },
    ];

    adjacentPositions.forEach(({ offset, condition }) => {
      if (condition) {
        const newId = currentId + offset;
        revealSquare(newId);
      }
    });
  }

  function handleRightClick(square) {
    if (isGameOver) return;

    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        flags++;
      } else {
        square.classList.remove("flag");
        flags--;
      }

      checkForWin();
    }
  }

  function gameOver(square) {
    isGameOver = true;
    squares.forEach((sq) => {
      if (sq.classList.contains("bomb") && !sq.classList.contains("flag")) {
        sq.classList.add("bomb-exploded");
      }
    });
  }

  function checkForWin() {
    const correctFlags = squares.filter(
      (sq) => sq.classList.contains("flag") && sq.classList.contains("bomb")
    ).length;
    if (correctFlags === bombAmount) {
      alert("You Won");
      isGameOver = true;
    }
  }

  createBoard();
});
