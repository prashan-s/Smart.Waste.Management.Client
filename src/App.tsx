import Spinner from "@components/common/Spinner";
import { dashboardRoutes } from "@routes/routes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner loading={true} />}>
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
    </BrowserRouter>
  )
}

export default App
