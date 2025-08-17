import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QueryCleaner() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const entries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isReload = entries.length > 0 && entries[0].type === "reload";

    if (isReload && location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  return null;
}
