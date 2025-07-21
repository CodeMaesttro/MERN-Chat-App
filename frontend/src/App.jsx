import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import useAuthHook from './hooks/useAuthhook'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth } = useAuthHook();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  const notify = () => toast('Here is your toast.');

  return (
    <div>
       <Toaster />
         <button onClick={notify}>Make me a toast</button>
      <NavBar authUser={authUser}/>

      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={!authUser ? <HomePage /> : <Navigate to="/signin" />} />
        {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/signup" element={<SignUpPage />} />
         <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/" />} /> 
      </Routes>
    </div>
  )
}

export default App