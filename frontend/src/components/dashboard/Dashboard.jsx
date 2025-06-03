import { Chip } from "@nextui-org/react";
import UserService from "../../service/userService";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const balance = useSelector((state) => state.balance.value);

  return (
    <div className="flex flex-col pt-12 items-center">
      <div className="text-4xl font-bold">
        Welcome to SenayCasino {localStorage.getItem("username")}!
      </div>
      <div className="mt-3">
        <span className="italic">"A day without gambling is a bad day"</span>{" "}
        ~D. Weber
      </div>
      <Chip className="mt-16 text-white" color="primary">
        Current balance: {balance}
      </Chip>
      <div className="mt-8 flex gap-16">
        <Link to="/coinflip">
          <GameCard title="Coinflip" icon="coin" />
        </Link>
        <Link to="/mines">
          <GameCard title="Mines" icon="bomb" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
