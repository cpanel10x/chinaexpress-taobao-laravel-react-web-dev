import axios from "axios";

const baseApiURL = process.env.REACT_APP_API_ENDPOINT;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const instanceSetToken = (token = "") => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    instance.defaults.headers.common["Authorization"] = "";
  }
};

export const apiGet = async (resource, params) => {
  return await instance
    .get(`${baseApiURL + resource}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors.response;
    });
};

export const apiPost = async (resource, params) => {
  return await instance
    .post(`${baseApiURL + resource}`, params)
    .then((res) => {
      return res.data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors.response;
    });
};

export const apiUpdate = async (resource, params) => {
  return await instance
    .put(`${baseApiURL + resource}`, params)
    .then((res) => {
      return res.data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors.response;
    });
};

export const apiDelete = async (resource) => {
  return instance
    .delete(baseApiURL + resource)
    .then((res) => {
      return res.data;
    })
    .catch((errors) => {
      console.log(errors);
      return errors.response;
    });
};
