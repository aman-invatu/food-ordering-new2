
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

// Define types
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// Mock users for demo
const mockUsers = [
  { id: '1', name: 'Demo User', email: 'demo@example.com', password: 'password123' }
];

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          toast.success('Login successful!');
          resolve();
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
          toast.error('Invalid email or password');
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          dispatch({ type: 'SET_LOADING', payload: false });
          toast.error('Email already in use');
          reject(new Error('Email already in use'));
        } else {
          const newUser = {
            id: String(mockUsers.length + 1),
            name,
            email,
            password
          };
          
          mockUsers.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          toast.success('Registration successful!');
          resolve();
        }
      }, 1000);
    });
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
