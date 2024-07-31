document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  let width = 10;
  let bombAmount = 20;
  let squares = [];

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

  function click(square) {
    if (square.classList.contains("bomb")) {
      alert("Game Over!");
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
    }
  }
});
