import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Authenticate user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/me');
          if (response.data?.success && response.data?.data) {
            setAdmin(response.data.data);
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Session authentication failed:', error.message);
          handleLogout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const handleLogin = async (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    setLoading(true);
    
    try {
      const response = await api.get('/auth/me');
      if (response.data?.success && response.data?.data) {
        setAdmin(response.data.data);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching admin data on login:', error.message);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  function handleLogout() {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated,
        loading,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to consume authentication
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
