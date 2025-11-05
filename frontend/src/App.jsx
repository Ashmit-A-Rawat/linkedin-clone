import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import Notifications from './pages/Notifications';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile'; // Add this import
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </>
                } 
              />
              <Route 
                path="/network" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Network />
                    </ProtectedRoute>
                  </>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  </>
                } 
              />
              <Route 
                path="/jobs" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  </>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  </>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </SocketProvider>
  );
}

export default App;