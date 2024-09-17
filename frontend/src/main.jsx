import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// import Update from './components/Update.jsx';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Signup from './components/Signup.jsx';
// import Login from './components/Login.jsx';
// import Posts from './components/Posts.jsx';
// import Navbar from './components/Navbar.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/update",
//     element: <Update />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/posts",
//     element: <Posts />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App/>
  </StrictMode>,
);
