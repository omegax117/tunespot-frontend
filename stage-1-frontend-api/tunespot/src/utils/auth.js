const login = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "fake token" });
  });
};

const getUser = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@email.com", id: "fake-id" },
    });
  });
};

const register = ({ name, avatar, email, password }) => {
  return new Promise((resolve, reject) => {
    resolve({ data: { name, avatar, email, password } });
  });
};

export { login, getUser, register };
