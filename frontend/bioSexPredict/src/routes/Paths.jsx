import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageLayout from "../layouts/PageLayout";
import CatalogarIndividuo from "../pages/CatalogarIndividuo";
import IndividuosCatalogados from "../pages/IndividuosCatalogados";
import Perfil from "../pages/Perfil";


const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/inicio" element={<PageLayout />}>
            <Route index element={<CatalogarIndividuo />} />
            <Route
              path="/inicio/catalogar-individuo"
              element={<CatalogarIndividuo />}
            />
            <Route
              path="/inicio/individuos-catalogados"
              element={<IndividuosCatalogados />}
            />
            <Route path="/inicio/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
