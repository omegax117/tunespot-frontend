import { baseUrl, processServerRequest } from "./api";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(processServerRequest);
};

const getUser = (token) => {
  headers.authorization = `Bearer ${token}`;
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: headers,
  }).then(processServerRequest);
};

const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerRequest);
};

export { login, getUser, register };
