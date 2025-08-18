import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import P from "@/components/ui-custom/P";
import { useThemeConfig } from "@/context/useThemeConfig";
import useDataState from "@/hooks/useDataState";
import empty from "@/utils/empty";
import { HStack } from "@chakra-ui/react";

const StatContainer = (props: any) => {
  // Props
  const { children } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <CContainer
      p={4}
      borderRadius={themeConfig.radii.component}
      bg={"body"}
      border={"1px solid"}
      borderColor={"border.subtle"}
    >
      {children}
    </CContainer>
  );
};

const SiteViews = () => {
  // States
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: ``,
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData title={null} description={null} minH={""} />,
    loaded: (
      <>
        <P fontWeight={"semibold"}>Site Views</P>
      </>
    ),
  };

  return (
    <StatContainer>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {(!data || empty(data)) && render.empty}
            </>
          )}
        </>
      )}
    </StatContainer>
  );
};

const DashboardPage = () => {
  return (
    <CContainer flex={1} px={[2, null, 4]} pt={[4, null, 0]} pb={4}>
      <HStack wrap={"wrap"} gap={4}>
        <SiteViews />
      </HStack>
    </CContainer>
  );
};

export default DashboardPage;
