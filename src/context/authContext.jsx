import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof localStorage.getItem("user") === "string") {
      if (!user) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }
    }
  }, [user]);

  const login = (newToken) => {
    setUser({ ...user, token: newToken });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
