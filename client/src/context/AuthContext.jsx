import { createContext, useEffect, useState } from 'react';

import { loginUser, registerUser, getMe } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (formData) => {
    const data = await loginUser(formData);

    localStorage.setItem('token', data.token);

    setUser(data.user);

    return data;
  };

  // REGISTER
  const register = async (formData) => {
    const data = await registerUser(formData);

    localStorage.setItem('token', data.token);

    setUser(data.user);

    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');

    setUser(null);
  };

  // AUTO LOGIN
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setLoading(false);
          return;
        }

        const data = await getMe();

        setUser(data.user);
      } catch (error) {
        console.error(error);

        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
