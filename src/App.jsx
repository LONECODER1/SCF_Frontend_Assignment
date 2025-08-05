import { createHashRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Leaderboard from './pages/Leaderboard';

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/leaderboard',
      element: <Leaderboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
