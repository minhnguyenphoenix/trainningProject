import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import ErrorPage from './components/Error/index.jsx';
import ProjectInfo from './pages/ProjectInfo/index.jsx';
import TicketInfo from './pages/TicketInfo/index.jsx';
import ProjectTable from './pages/ProjectTable/index.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/',
            element: <ProjectTable />,
          },
          {
            path: '/:projectId',
            element: <ProjectInfo />,
          },
          {
            path: '/:projectId/:ticketId',
            element: <TicketInfo />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
