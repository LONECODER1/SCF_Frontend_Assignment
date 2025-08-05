import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Leaderboard from './pages/Leaderboard';

function App() {
  const router = createBrowserRouter([
    {
      element: <HomePage />,
      path: '/'
    },
    {
      element: <Login />,
      path: '/login'
    },
    {
      element: <SignUp />,
      path: '/signup'
    },
    {
      element: <Dashboard />,
      path: '/dashboard'
    },
    {
      element: <Leaderboard />,
      path: '/leaderboard'
    },
  ])

  return (<RouterProvider router={router} />);
}

export default App;
