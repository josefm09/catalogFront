import http from "../http-common";

const getAll = () => {
  return http.get("/sell");
};

const get = id => {
  return http.get(`/sell/${id}`);
};

const create = data => {
  return http.post("/sell", data);
};

const update = (data) => {
  return http.put(`/sell`, data);
};

const remove = id => {
  return http.delete(`/sell/${id}`);
};

const removeAll = () => {
  return http.delete(`/sell`);
};

const findByTitle = title => {
  return http.get(`/sell?name=${title}`);
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
