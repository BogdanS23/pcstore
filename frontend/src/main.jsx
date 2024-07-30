import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ConfiguratorPage } from './pages/ConfiguratorPage.jsx';
import { MainPage } from './pages/MainPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import Register from "./components/Register.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import CartPage from "./pages/CartPage.jsx";
import AuthService from "./services/AuthService.jsx";
import {PCPage} from "./pages/PCPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: 'configurator',
        element: <ConfiguratorPage />
      },
      {
        path: 'adminpanel',
        element: (
            <ProtectedRoute roleRequired='ROLE_ADMIN'>
              <AdminPanel />
            </ProtectedRoute>
        )
      },
      {
        path: 'adminpage',
        element: (
            <ProtectedRoute roleRequired='ROLE_ADMIN'>
              <AdminPage />
            </ProtectedRoute>
        )
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'pc',
        element: <PCPage />
      },
      {
        path: 'profile',
        element: (
            <ProtectedRoute roleRequired="ROLE_USER">
              <ProfilePage />
            </ProtectedRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);
