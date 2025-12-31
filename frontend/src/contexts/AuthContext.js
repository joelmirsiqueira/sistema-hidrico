import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Inicializa lendo do localStorage para persistir o login ao recarregar a página
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('@SistemaHidrico:user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem('@SistemaHidrico:user', JSON.stringify(userData));
    localStorage.setItem('@SistemaHidrico:token', userData.token);
  };

  const signOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
