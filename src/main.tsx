import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import CommentList from './components/CommentList.tsx'
import Comment from './components/Comment.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/list",
        element: <CommentList />,
      },
      {
        path: "/comment",
        element: <Comment />,
      },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
