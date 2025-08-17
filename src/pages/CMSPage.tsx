import CContainer from "@/components/ui-custom/CContainer";
import getAuthToken from "@/utils/getAuthToken";

const CMSPage = () => {
  const authToken = getAuthToken();

  return (
    <CContainer flex={1} p={4} pt={[4, null, 0]}>
      <iframe
        src={`https://mamura.vercel.app?cms=${authToken}`}
        style={{
          position: "absolute",
          top: "56px",
          left: 0,
          width: "100%",
          height: "calc(100dvh - 56px)",
          border: 0,
        }}
        allowFullScreen
      />
    </CContainer>
  );
};

export default CMSPage;
