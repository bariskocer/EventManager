// src/App.jsx
import React, { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, fetchSelectableImages } from "./util/http.js";

import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,
    children: [
      {
        path: "new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "edit",
        element: <EditEvent />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    // Debug: bir kere çağırıp konsola ne geldiğini görebilirsin
    fetchSelectableImages({ signal: undefined })
      .then((imgs) => console.log("🖼️ fetched images:", imgs))
      .catch((err) => console.error("fetchImages error:", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
