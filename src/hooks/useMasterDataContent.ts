import { useLocation } from "react-router-dom";
import useScreen from "./useScreen";

export function useMasterDataContent(settingsPath: string = "/master-data") {
  const location = useLocation();

  const masterDataRoute = location.pathname === settingsPath;
  const { sw } = useScreen();
  const siss = sw < 1200;

  return { masterDataRoute, siss };
}
