import { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

// Lazy-loaded components
const LazyLogin = lazy(() => import("../pages/Login/Login"));
const LazyHome = lazy(() => import("../pages/Home/Home"));
const LazyFavorite = lazy(() => import("../pages/Favorite/Favorite"));
const LazyDashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const LazyDetail = lazy(() => import("../pages/Detail/Detail"));

// Higher-order component for lazy loading with Suspense
const withSuspense = (Component) => {
  const WithSuspense = (props) => (
    <Suspense fallback={<>...</>}>
      <Component {...props} />
    </Suspense>
  );

  // Set display name
  WithSuspense.displayName = `withSuspense(${
    Component.displayName || Component.name
  })`;

  return <WithSuspense />;
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={withSuspense(LazyDashboard)} />
        <Route path="/login" element={withSuspense(LazyLogin)} />
        <Route
          path="/home"
          element={<ProtectedRoute>{withSuspense(LazyHome)}</ProtectedRoute>}
        />
        <Route
          path="/home/:id"
          element={<ProtectedRoute>{withSuspense(LazyDetail)}</ProtectedRoute>}
        />
        <Route
          path="/favorite"
          element={
            <ProtectedRoute>{withSuspense(LazyFavorite)}</ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<p>No Match</p>} />
    </Routes>
  );
}
