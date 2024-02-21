import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={"Loading"}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={"Loading"}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
