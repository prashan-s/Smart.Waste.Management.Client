import Loader from "@components/common/Loader";
import { AuthProvider } from "@contexts/AuthContext";
import { dashboardRoutes } from "@routes/routes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loader loading={true} />}>
          <Routes>
            {dashboardRoutes.map((route) => (
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
