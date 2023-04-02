import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SelectTeam, Meeting, AskMeetingType } from "../../screens"

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>root</p>
  },
  {
    path: "/teams",
    element: <SelectTeam />
  },
  {
    path: "/meeting",
    element: <Meeting />
  },
  {
    path: "/meeting_type/:team_id",
    element: <AskMeetingType />
  }
])

const Router: React.FC<{}> = () => {
  return <RouterProvider router={router} />
}


export default Router
