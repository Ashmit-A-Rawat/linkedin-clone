import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.BACKEND_URL || (import.meta.env.PROD ? "" : "http://localhost:5001");


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('${backendUrl}api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('🔐 Registering user:', { name, email });
      
      const response = await axios.post('${backendUrl}api/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
      
      console.log('✅ Registration successful:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const updateUser = (userData) => {
  setUser(prevUser => ({
    ...prevUser,
    ...userData
  }));
};

  const login = async (email, password) => {
    try {
      console.log('🔐 Logging in user:', email);
      
      const response = await axios.post('${backendUrl}api/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });
      
      console.log('✅ Login successful:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};