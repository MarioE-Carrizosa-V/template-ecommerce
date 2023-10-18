import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  userId: string;
  email: string;
  isAuthenticated: boolean;
  promptMFA: boolean;
  clientToken: string;
  expiresIn: number;
  authCookie: authCookieData;
  accountAuthCookie: authCookieData;
  phonenumber: string;
  scope: string;
};

type authCookieData = {
  Name: string;
  Value: String;
};

// Define el tipo del contexto
type SessionContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

// Crea el contexto
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Proveedor de sesión
export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, ...userData };
      }
      return null;
    });
  };
  return (
    <SessionContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// Función de ayuda para usar el contexto
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession debe usarse dentro de un SessionProvider");
  }
  return context;
};
