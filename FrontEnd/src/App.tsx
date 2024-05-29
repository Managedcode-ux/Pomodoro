// import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import SignUpComp from "./Features/Users/SignUp.tsx";
import Layout from "./Features/Commons/Root.tsx";
import LandingPage from "./Features/Commons/LandingPage.tsx";
import AuthenticationForm from "./Features/Users/Login.tsx";
import HomePage from "./Features/Commons/Hompage.tsx";
import TaskAcc from "./Features/Tasks/TaskAccordion.tsx";
import AddTasks from "./Features/Tasks/AddTasks.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    // index: true,
  },
  {
    path: "/login",
    element: <AuthenticationForm formtype="login" />,
  },
  {
    path: "/register",
    element: <AuthenticationForm formtype="register" />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "AddTasks",
        element: <AddTasks />,
      },
      {
        path: "AllTasks",
        element: <TaskAcc />,
      },
    ],
  },
]);

function App() {
  // TO CHECK :- HOW TO SEND A PROP UPWARDS TOWARDS PARENT
  return <RouterProvider router={router} />;
}

export default App;
