import axios from "axios";

export default axios.create({
  baseURL: "http://jcflores.laziness.rocks:8080",
  headers: {
    "Content-type": "application/json"
  }
});
