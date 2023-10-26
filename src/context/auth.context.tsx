import { createContext, useContext, useState } from "react";

export const context = createContext<AuthContextType>({
  setAccessToken: () => {},
  accessToken: ""
});

export const useAuth = () => {
  const authContext = useContext(context);
  return authContext;
};

export const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState("");

  return <context.Provider value={{ setAccessToken, accessToken }}>{children}</context.Provider>;
};
