import axios from "axios";

export default axios.create({
  baseURL: "https://jcflores.laziness.rocks:8080",
  headers: {
    "Content-type": "application/json"
  }
});
