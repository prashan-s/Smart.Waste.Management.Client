import Loader from "@components/common/Loader";
import { AuthProvider } from "@contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@theme/theme";
import { clientRoutes } from "@routes/ClientRoutes";
import { dashboardRoutes } from "@routes/DashboardRoutes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
