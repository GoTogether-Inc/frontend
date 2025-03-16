import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isModalOpen, openModal: () => setIsModalOpen(true), closeModal: () => setIsModalOpen(false) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
