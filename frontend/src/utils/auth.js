export const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

export const logout = () => {
  localStorage.removeItem("token");
};
