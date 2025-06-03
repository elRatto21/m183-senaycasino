import { Button, Slider } from "@nextui-org/react";
import UserService from "../../service/userService";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../state/balanceSlice";

const Coinflip = () => {
  const [amount, setAmount] = useState(1);
  const [side, setSide] = useState("heads");
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [coin, setCoin] = useState("heads");
  const balance = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (inGame) {
      intervalId = setInterval(() => {
        setCoin((prevCoin) => (prevCoin === "heads" ? "tails" : "heads"));
      }, 200);
    } else if (result !== null) {
      setCoin(result.result);
    } else {
      setCoin("heads");
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [inGame]);

  const startGame = () => {
    setDisabled(true);
    setInGame(true);
    UserService.coinflip(amount, side).then((data) => {
      setResult(data);
      setTimeout(() => {
        setInGame(false);
        setCoin(data.result);
        dispatch(set(data.balance));
      }, 2000);
    });
  };

  const restartGame = () => {
    setDisabled(false);
    setAmount(1);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-between h-[550px] pt-12">
      <div>
        <div className="text-4xl font-bold text-center mb-12">Coinflip</div>
        {inGame === false && result === null ? (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold">Heads or Tails?</div>
            <div className="flex gap-12 mt-8">
              {side === "heads" ? (
                <img
                  src="/heads.png"
                  width={128}
                  height={128}
                  alt="heads"
                  onClick={() => setSide("heads")}
                  className="cursor-pointer border-4 border-primary rounded-full"
                />
              ) : (
                <img
                  src="/heads.png"
                  width={128}
                  height={128}
                  alt="heads"
                  onClick={() => setSide("heads")}
                  className="cursor-pointer"
                />
              )}
              {side === "tails" ? (
                <img
                  src="/tails.png"
                  width={128}
                  height={128}
                  alt="tails"
                  onClick={() => setSide("tails")}
                  className="cursor-pointer border-4 border-primary rounded-full"
                />
              ) : (
                <img
                  src="/tails.png"
                  width={128}
                  height={128}
                  alt="tails"
                  onClick={() => setSide("tails")}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        ) : (
          inGame === false &&
          result !== null && (
            <div>
              <img src={`/${coin}.png`} alt="coin" width={128} height={128} />
              <div className="flex flex-col items-center pt-8 text-3xl gap-4">
                <div>
                  You{" "}
                  {result.result === result.side ? (
                    <span className="font-semibold">won</span>
                  ) : (
                    <span className="font-semibold">lost</span>
                  )}
                </div>
                <div className="font-semibold text-4xl">
                  {result.result === result.side ? (
                    <span className="text-success-500">+{result.bet}</span>
                  ) : (
                    <span className="text-red-600">-{result.bet}</span>
                  )}
                </div>
              </div>
            </div>
          )
        )}
        {inGame === true && (
          <div>
            <img src={`/${coin}.png`} alt="coin" width={128} height={128} />
          </div>
        )}
      </div>

      {inGame === false && result !== null ? (
        <div className="flex flex-col gap-6">
          <Button color="primary" onClick={restartGame} className="w-[300px]">
            Start new game
          </Button>
        </div>
      ) : (
        inGame === false &&
        result === null && (
          <div className="flex flex-col gap-6">
            <Slider
              isDisabled={disabled}
              label="Amount"
              step={1}
              maxValue={balance}
              minValue={1}
              value={amount}
              onChange={setAmount}
              className="w-[300px]"
            />
            <Button isDisabled={disabled} color="primary" onClick={startGame}>
              Flip the coin
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default Coinflip;
