import axios from "axios";

const API_URL = "http://localhost:4000/api/";

const getBalance = () => {
  return axios
    .get(
      API_URL + "user/balance?username=" + localStorage.getItem("username"),
      { withCredentials: true }
    )
    .then((response) => {
      let data = response.data;
      return data.balance;
    });
};

const getUser = () => {
  return axios
    .get(API_URL + "user", { withCredentials: true })
    .then((response) => {
      const data = response.data;
      return data;
    });
};

const coinflip = (bet, side) => {
  return axios
    .post(API_URL + "coinflip", {
      username: localStorage.getItem("username"),
      bet: bet,
      side: side,
    })
    .then((response) => {
      let data = response.data;
      return data;
    });
};

const updateBalance = (amount) => {
  return axios
    .put(
      API_URL + "user/balance?username=" + localStorage.getItem("username"),
      {
        amount: amount,
      }
    )
    .then((response) => {
      let data = response.data;
      return data.balance;
    });
};

const UserService = {
  getBalance,
  coinflip,
  updateBalance,
  getUser
};

export default UserService;
