import http from "../http-common";

const getAll = () => {
  return http.get("/product");
};

const get = id => {
  return http.get(`/product/${id}`);
};

const create = data => {
  return http.post("/product", data);
};

const update = (data) => {
  return http.put(`/product`, data);
};

const remove = id => {
  return http.delete(`/product/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove
};
