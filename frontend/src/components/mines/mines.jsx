import { Button, Card, Slider } from "@nextui-org/react";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import UserService from "../../service/userService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { set } from "../../state/balanceSlice";
import { useSelector } from "react-redux";

const Mines = () => {
  const [gridSize] = useState(5);
  const [minesCount, setMinesCount] = useState(3);
  const [betAmount, setBetAmount] = useState(0);
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [currentPot, setCurrentPot] = useState(0);
  const balance = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();

  const initializeGame = () => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill({ mine: false, revealed: false }));

    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!newGrid[row][col].mine) {
        newGrid[row][col].mine = true;
        minesPlaced++;
      }
    }
    UserService.updateBalance(betAmount * -1).then((data) => {
      dispatch(set(data));
    });
    setCurrentPot(betAmount);
    setGrid(newGrid);
    setInGame(true);
    setRevealed(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(false))
    );
    setGameOver(false);
    setDisabled(false);
  };

  const revealCell = (row, col) => {
    if (grid[row][col].mine) {
      alert("Game Over! You hit a mine.");
      setDisabled(true);
      setCurrentPot(betAmount * -1);
      setBetAmount(0);
      setGameOver(true);
      setInGame(false);
    } else {
      const newRevealed = [...revealed];
      newRevealed[row][col] = true;
      setRevealed(newRevealed);
      setCurrentPot(Math.floor(currentPot * 1.1));
    }
  };

  const updateBalance = () => {
    UserService.updateBalance(currentPot).then((data) => {
      dispatch(set(data));
    });
  };

  const cashOut = () => {
    updateBalance();
    setGameOver(true);
  };

  const handleStartGame = () => {
    if (betAmount > balance) {
      alert("You do not have enough balance to place this bet.");
      return;
    }
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="text-4xl font-bold text-center mb-12">Mines</div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Card key={`${rowIndex}-${colIndex}`} isHoverable isPressable>
              <Button
                disabled={disabled || revealed[rowIndex][colIndex] || gameOver}
                css={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: revealed[rowIndex][colIndex]
                    ? cell.mine
                      ? "red"
                      : "green"
                    : "gray",
                  borderRadius: "12px",
                  fontSize: "1.5rem",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => revealCell(rowIndex, colIndex)}
              >
                {revealed[rowIndex][colIndex] ? (
                  cell.mine ? (
                    <FiAlertCircle size={24} />
                  ) : (
                    <FiCheck size={24} />
                  )
                ) : (
                  ""
                )}
              </Button>
            </Card>
          ))
        )}
      </div>
      {inGame === false ? (
        <div className="w-[200px] mt-6">
          <Slider
            minValue={1}
            value={minesCount}
            maxValue={24}
            onChange={setMinesCount}
            label="Mines"
            className="text-black w-full"
          />
          <Slider
            type="number"
            value={betAmount}
            maxValue={balance}
            onChange={setBetAmount}
            placeholder="Bet Amount"
            className="text-black w-full"
            label="Bet"
          />
          <Button
            disabled={disabled || gameOver}
            color="primary"
            onClick={handleStartGame}
            className="w-full mt-8"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </Button>
        </div>
      ) : inGame === true && gameOver === false ? (
        <div className="flex flex-col gap-6 mt-6 w-[200px] items-center">
          <div className="text-large font-semibold">
            Current win: {currentPot - betAmount}
          </div>
          <Button
            color="success"
            className="text-white w-full"
            onClick={cashOut}
          >
            Cash out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mt-6 w-[200px] items-center">
          <div className="text-large font-semibold">You won {currentPot - betAmount}</div>
          <Button
            color="primary"
            className="text-white w-full"
            onClick={initializeGame}
          >
            Play again
          </Button>
        </div>
      )}
    </div>
  );
};

export default Mines;
