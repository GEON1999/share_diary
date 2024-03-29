import React, { ReactNode, useCallback, useContext } from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  assignUser: () => null,
  login: () => null,
  logout: () => null,
  register: () => null,
};

const AuthContext = createContext(defaultProvider);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const router = useRouter();

  const handleLogin = async (username, password) => {
    const { data } = await axios.post("/api/users/enter", {
      username,
      password,
    });

    if (data.success) {
      setUser({ ...data.user });
      setLoading(false);

      router.push("/");
    }
    return data;
  };

  const handleLogout = useCallback(async () => {
    setUser(null);
    await axios.post("/api/users/logout");
    router.push("/login");
  }, []);

  const register = async (data) => {
    const { data: userData } = await axios.post("/api/users/join", data);
    return userData;
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: userData } = await axios.get("/api/users/me");
      if (userData?.success) {
        setUser({ ...userData.user });
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: register,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
