import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

interface AuthContextType {
  user: { id: string; nombre: string; rol: string; fotoPerfil?: string } | null;
  setUser: (user: { id: string; nombre: string; rol: string; fotoPerfil?: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; nombre: string; rol: string; fotoPerfil?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/usuarios/me')
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};