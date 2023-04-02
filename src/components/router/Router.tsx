import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>root</p>
  },
  {
    path: "/teams",
    element: <p>Select teams</p>
  },
  {
    path: "/meeting",
    element: <p>start meeting</p>
  },
])

const Router: React.FC<{}> = () => {
  return <RouterProvider router={router} />
}


export default Router
