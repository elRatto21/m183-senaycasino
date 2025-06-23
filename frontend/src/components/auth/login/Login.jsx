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
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true
        }
      );

      console.log(response);

      localStorage.setItem("username", response.data.username);
      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.errors) {
          const errors = error.response.data.errors.map(
            (error) => (error = error.msg)
          );

          setErrors(errors);

          console.log("ya", errors);
        } else if (error.response.data.error) {
          setErrors([error.response.data.error]);
        }
      }

      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center pt-24">
      <Card className="w-[325px] h-fit">
        <CardHeader className="flex justify-center pt-6">
          <div className="font-bold cursor-default text-4xl">SenayCasino</div>
        </CardHeader>
        <CardBody className="flex gap-4">
          <div className="cursor-default text-2xl text-center">Login</div>
          <Input
            type="text"
            label="Username"
            value={username}
            onValueChange={setUsername}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onValueChange={setPassword}
          />
          {errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <Link href="/register" className="cursor-pointer">
              Register
            </Link>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center pb-6">
          <Button color="primary" className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
