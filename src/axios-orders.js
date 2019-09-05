import axios from "axios";

const instance = axios.create({
  baseURL: "https://myburger-backend-cc8d0.firebaseio.com/"
});

export default instance;
