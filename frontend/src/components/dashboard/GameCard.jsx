import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Icon from "../icons/Icon";

const GameCard = ({ title, link, icon }) => {
  const nav = useNavigate();
  return (
    <Card className="w-[175px] h-[175px]">
      <CardBody onClick={() => nav(link)} className="cursor-pointer text-2xl font-semibold flex justify-center gap-4 items-center">
        <div>{title}</div>
        <div>
          <Icon size={"96px"} name={icon} />
        </div>
      </CardBody>
    </Card>
  );
};

export default GameCard;
