import BombIcon from "./BombIcon";
import CoinIcon from "./CoinIcon";

const Icon = ({ name, size }) => {
  switch (name) {
    case "coin":
      return <CoinIcon size={size} />;
    case "bomb":
      return <BombIcon size={size} />;
    default:
      return null;
  }
};

export default Icon;
