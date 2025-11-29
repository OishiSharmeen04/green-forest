import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Plants from "../pages/Plants";
import Profile from "../pages/Profile";
import PlantDetails from "../pages/PlantDetails";
import PrivateRoute from "../routes/PrivateRoute";
import PlantOfTheWeek from "../pages/PlantOfTheWeek";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "plants", element: <Plants /> },
      { path: "plant-of-the-week", element: <PlantOfTheWeek /> },

      // Protected Routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "plants/:id",
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
