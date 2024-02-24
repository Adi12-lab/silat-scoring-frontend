import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

//Admin
const Kegiatan = lazy(() => import("./pages/Admin/Kegiatan/Kegiatan"));
const User = lazy(() => import("./pages/Admin/User/User"));
const Peserta = lazy(() => import("./pages/Peserta/Peserta"));
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
        <Route element={<ProtectedRoute roles={["ADMIN", "JURI"]} />}>
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
          <Route
            path="/user"
            element={
              <Suspense fallback={"Loading"}>
                <User />
              </Suspense>
            }
          />
          <Route
            path="/kegiatan/:kegiatan/peserta"
            element={<Suspense fallback={"Loading"}>
              <Peserta />
            </Suspense>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// export const SuspenseWrap = ({ children }: { children: React.ReactNode }) => {
//   return <Suspense fallback="Loading">{children}</Suspense>;
// };
