import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import { Details, Home, Results } from "@/pages";
import { Layout } from "@/containers";

export function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Results />} />
          <Route path="/items/:id" element={<Details />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
