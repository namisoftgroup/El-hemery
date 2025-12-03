import { createBrowserRouter } from "react-router";
// import ProtectionProvider from "./ProtectionProvider";
import RootLayout from "../layout/RootLayout";
import Error from "../routes/Error";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Contact from "../routes/Contact";
import Faqs from "../routes/Faqs";
import Duas from "../routes/Duas";
import Profile from "../routes/Profile";
import Notifications from "../routes/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
       {
        path: "signin",
        element: <Login />,
      },
      {
          path: "contact",
        element: <Contact />,
      },
         {
          path: "faqs",
        element: <Faqs />,
      },
       {
          path: "daus",
        element: <Duas />,
      },
       {
          path: "profile",
        element: <Profile />,
      },
       {
          path: "notifications",
        element: <Notifications />,
      }
    ],
  },
]);
