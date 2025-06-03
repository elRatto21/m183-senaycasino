import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import AuthService from "../../service/authService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const balance = useSelector((state) => state.balance.value);
  const nav = useNavigate();

  return (
    <Navbar isBordered>
      <NavbarBrand className="cursor-default">
        <p
          className="font-bold text-xl cursor-pointer"
          onClick={() => nav("/")}
        >
          SenayCasino
        </p>
      </NavbarBrand>
      <NavbarContent className="gap-10" justify="end">
        <NavbarItem>
          <Link
            color="foreground"
            onClick={() => nav("/coinflip")}
            className="font-semibold cursor-pointer"
          >
            Coinflip
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            onClick={() => nav("/mines")}
            className="font-semibold cursor-pointer"
          >
            Mines
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Chip color="primary">Balance: {balance}</Chip>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger className="cursor-pointer">
              <Avatar
                isBordered
                name={AuthService.getUsername()}
                color="primary"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="user" textValue="User">
                Logged in as{" "}
                <span className="font-semibold">
                  {AuthService.getUsername()}
                </span>
              </DropdownItem>
              <DropdownItem
                key="logout"
                onClick={() => AuthService.logout()}
                className="text-danger-500"
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
