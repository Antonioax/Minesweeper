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

      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();
});
