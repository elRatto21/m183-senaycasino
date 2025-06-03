import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import AuthService from "../../../service/authService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
      AuthService.register(username, password);
    }
  return (
    <div className="flex justify-center pt-24">
      <Card className="w-[325px] h-[400px]">
        <CardHeader className="flex justify-center pt-6">
          <div className="font-bold cursor-default text-4xl">SenayCasino</div>
        </CardHeader>
        <CardBody className="flex gap-4">
          <div className="cursor-default text-2xl text-center">Register</div>
          <Input type="text" label="Username" value={username} onValueChange={setUsername} />
          <Input type="password" label="Password" value={password} onValueChange={setPassword} />
          <div className="flex justify-between">
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center pb-6">
          <Button color="primary" className="w-full" onClick={handleRegister}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
