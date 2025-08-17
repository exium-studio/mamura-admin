import NavsContainer from "@/components/widget/NavsContainer";
import { MASTER_DATA_ROUTES, PRIVATE_ROUTES, ROUTES } from "@/constants/routes";
import useLang from "@/context/useLang";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import pluck from "@/utils/pluck";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./AuthMiddleware";
import MasterDataNavsContainer from "@/components/widget/MasterDataNavsContainer";

const Routing = () => {
  // Hooks
  const { l } = useLang();

  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {PRIVATE_ROUTES.map(
        ({
          path,
          activePath,
          backPath,
          allowedPermissions,
          titleKey,
          element,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthMiddleware allowedPermissions={allowedPermissions}>
                <NavsContainer
                  activePath={activePath}
                  title={pluck(l, titleKey)}
                  backPath={backPath}
                >
                  {element}
                </NavsContainer>
              </AuthMiddleware>
            }
          />
        )
      )}

      {MASTER_DATA_ROUTES.map(
        ({
          path,
          activePath,
          backPath,
          allowedPermissions,
          titleKey,
          element,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthMiddleware allowedPermissions={allowedPermissions}>
                <NavsContainer
                  activePath={activePath}
                  title={pluck(l, titleKey)}
                  backPath={backPath}
                >
                  <MasterDataNavsContainer align={"stretch"} activePath={path}>
                    {element}
                  </MasterDataNavsContainer>
                </NavsContainer>
              </AuthMiddleware>
            }
          />
        )
      )}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
