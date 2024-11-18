import RootLayout from "@components/Layout";
import LoadingScreen from "@components/Loading/LoadingScreen";
import { Suspense, ComponentType, lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const Loadable =
  <P extends object>(Component: ComponentType) =>
  (props: P) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

// Pages
const Home = Loadable(lazy(() => import("@pages/Home")));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
