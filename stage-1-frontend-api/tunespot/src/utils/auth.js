const login = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "fake token" });
  });
};

const getUser = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "fake user",
        email: "fake@email.com",
        id: "fake-id",
        avatar:
          "https://images.unsplash.com/photo-1578763727915-a976fa77f8c4?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    });
  });
};

const register = ({ name, avatar, email, password }) => {
  return new Promise((resolve, reject) => {
    resolve({ data: { name, avatar, email, password } });
  });
};

export { login, getUser, register };
