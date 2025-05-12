export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};