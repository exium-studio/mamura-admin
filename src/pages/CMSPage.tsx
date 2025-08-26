import CContainer from "@/components/ui-custom/CContainer";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import getAuthToken from "@/utils/getAuthToken";

const LANDING_PAGE_URL = import.meta.env.VITE_LANDING_PAGE_URL;

const CMSPage = () => {
  // Hooks
  const iss = useIsSmScreenWidth();

  // States
  const authToken = getAuthToken();

  return (
    <CContainer
      flex={1}
      px={[2, null, 4]}
      pt={[4, null, 0]}
      pb={4}
      className={"scrollY"}
    >
      <iframe
        src={`${LANDING_PAGE_URL}?cms=${authToken}`}
        style={{
          position: "absolute",
          top: "56px",
          left: 0,
          width: "100%",
          height: iss ? "calc(100dvh - 56px - 80px)" : "calc(100vh - 56px)",
          border: 0,
        }}
        allowFullScreen
      />
    </CContainer>
  );
};

export default CMSPage;
