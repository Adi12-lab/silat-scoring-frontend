import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

//Admin
const Kegiatan = lazy(() => import("./pages/Kegiatan"));
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
        <Route element={<ProtectedRoute roles={["ADMIN", "PENGAWAS"]} />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"Loading"}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route
            path="/kegiatan"
            element={
              <Suspense fallback={"Loading"}>
                <Kegiatan />
              </Suspense>
            }
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
