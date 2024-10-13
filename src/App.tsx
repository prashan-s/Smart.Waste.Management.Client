import Spinner from "@components/common/Spinner";
import { dashboardRoutes } from "@routes/routes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Spinner loading={true} />}>
        <Routes>
          {dashboardRoutes.map((dashboardRoute) => (
            <Route
              key={dashboardRoute.path}
              path={dashboardRoute.path}
              element={dashboardRoute.element}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
