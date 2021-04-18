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

const removeAll = () => {
  return http.delete(`/product`);
};

const findByTitle = title => {
  return http.get(`/product?name=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
