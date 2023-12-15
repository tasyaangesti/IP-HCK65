import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./views/Login";
import Layout from "./views/Layout";
import { Register } from "./views/Register";
import { Popular } from "./components/Card";
import DetailRecipe from "./components/DetailRecipe";
import { ReviewRecipe } from "./components/ReviewOfRecipe";
import { AllFeedback } from "./views/AllFeedback";
import { EditReviewRecipe } from "./components/EditReview";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
        const isLogin = localStorage.getItem("access_token");
        if (isLogin) {
          return redirect("/");
        }
        return null;
      },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
        const isLogin = localStorage.getItem("access_token");
        if (isLogin) {
          return redirect("/");
        }
        return null;
      },
  },
  {
    element: <Layout />,
    loader: () => !localStorage.getItem("access_token") && redirect("/login"),
    children: [
      {
        path: "/",
        element: <Popular />,
      },
      {
        path: "/recipe/:id",
        element: < DetailRecipe />,
      },
      {
        path: "/recipe/form-feedback",
        element: < ReviewRecipe />,
      },
      {
        path: "/recipe/feedback",
        element: < AllFeedback />,
      },
      {
        path: "/recipe/feedback/edit/:id",
        element: < EditReviewRecipe />,
      }
    ],
  },
]);
