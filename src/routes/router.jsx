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
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "plants", element: <Plants /> },
      { path: "plant-of-the-week", element: <PlantOfTheWeek /> },
      { path: "plants/:id", element: <PlantDetails /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetails />},

      // Protected Routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

