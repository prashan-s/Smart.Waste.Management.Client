import Loader from "@components/common/Loader";
import { AuthProvider } from "@contexts/AuthContext";
import { clientRoutes } from "@routes/ClientRoutes";
import { dashboardRoutes } from "@routes/DashboardRoutes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loader loading={true} />}>
          <Routes>
            {/* Dashboard routes */}
            {dashboardRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}

            {/* Client routes */}
            {clientRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
