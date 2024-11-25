import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/root/Root';
import Error from './components/error/Error';
import Home from './components/Home/Home';
import AuthProvider from './components/providers/AuthProvider';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>
    },]
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>
  </AuthProvider>
  ,
)
