import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PageLayout from '../layouts/PageLayout';
import CatalogarIndividuo from '../pages/CatalogarIndividuo';
import IndividuosCatalogados from '../pages/IndividuosCatalogados';
import Perfil from '../pages/Perfil';
import PrivateRouteWrapper from '../utils/PrivateRoute';

const Paths = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
              element={
                <PrivateRouteWrapper>
                  <Outlet />
                </PrivateRouteWrapper>
              }
          >
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
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default Paths;