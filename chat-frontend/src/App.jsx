import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';


const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}> 
    <div>
      {authUser && <Navbar />}
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/login" /> : <SignUpPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
    </ThemeProvider>
  );
};

export default App;