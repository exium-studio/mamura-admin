import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import P from "@/components/ui-custom/P";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useDataState from "@/hooks/useDataState";
import { OPTIONS_DASHBOARD_PERIOD } from "@/static/selectOptions";
import capsFirstLetter from "@/utils/capsFirstLetter";
import empty from "@/utils/empty";
import formatNumber from "@/utils/formatNumber";
import pluck from "@/utils/pluck";
import { Badge, HStack, Icon } from "@chakra-ui/react";
import {
  IconArrowDown,
  IconArrowUp,
  IconCaretDownFilled,
  IconEqual,
} from "@tabler/icons-react";
import { useState } from "react";

const SelectPeriod = (props: any) => {
  // Props
  const { period, setPeriod } = props;

  // Hooks
  const { l } = useLang();

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <BButton size={"xs"} variant={"ghost"}>
          {capsFirstLetter(pluck(l, period.labelKey) as string)}

          <Icon boxSize={4} color={"fg.subtle"}>
            <IconCaretDownFilled />
          </Icon>
        </BButton>
      </MenuTrigger>

      <MenuContent>
        {OPTIONS_DASHBOARD_PERIOD.map((period) => {
          return (
            <MenuItem
              key={period.id}
              value={period.id}
              onClick={() => setPeriod(period)}
            >
              {capsFirstLetter(pluck(l, period.labelKey) as string)}
            </MenuItem>
          );
        })}
      </MenuContent>
    </MenuRoot>
  );
};
const StatContainer = (props: any) => {
  // Props
  const { title, children, period, setPeriod } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  // States

  return (
    <CContainer
      flex={1}
      p={2}
      borderRadius={themeConfig.radii.component}
      bg={"body"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      h={"full"}
    >
      <HStack justify={"space-between"} pl={2}>
        <P fontWeight={"semibold"}>{title}</P>

        <SelectPeriod period={period} setPeriod={setPeriod} />
      </HStack>
      {children}
    </CContainer>
  );
};
const Stat = (props: any) => {
  // Props
  const { stat, period } = props;

  // States
  const count = `${formatNumber(stat[period.id].count)}`;
  const lastCount = `${formatNumber(stat[period.id][period.lastCount])}`;
  const percentageComparison = `${formatNumber(
    stat[period.id][period.percentageComparison]
  )}%`;

  const grow = count > lastCount;
  const shrink = count < lastCount;
  const equal = count === lastCount;

  return (
    <CContainer px={2} pb={2}>
      <P fontWeight={"bold"} fontSize={"2xl"}>
        {count}
      </P>

      <HStack justify={"space-between"}>
        <HStack>
          <P>Last: </P>
          <P>{lastCount}</P>
        </HStack>

        <Badge w={"fit"} colorPalette={grow ? "green" : equal ? "gray" : "red"}>
          {!equal && (
            <Icon boxSize={3}>
              {grow ? (
                <IconArrowUp />
              ) : shrink ? (
                <IconArrowDown />
              ) : (
                <IconEqual />
              )}
            </Icon>
          )}
          {percentageComparison}
        </Badge>
      </HStack>
    </CContainer>
  );
};
const SiteViews = () => {
  // States
  const [period, setPeriod] = useState<any>(OPTIONS_DASHBOARD_PERIOD[0]);
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/admin/dashboard/insight/get-count-site-visit`,
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner minH={"60px"} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData title={null} description={null} minH={""} />,
    loaded: <Stat stat={data} period={period} />,
  };

  return (
    <StatContainer title={"Site Views"} period={period} setPeriod={setPeriod}>
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
const BlogViews = () => {
  // States
  const [period, setPeriod] = useState<any>(OPTIONS_DASHBOARD_PERIOD[0]);
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/admin/dashboard/insight/get-count-blog-visit`,
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner minH={"60px"} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData title={null} description={null} minH={""} />,
    loaded: <Stat stat={data} period={period} />,
  };

  return (
    <StatContainer title={"Blog Views"} period={period} setPeriod={setPeriod}>
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
const JobApplied = () => {
  // States
  const [period, setPeriod] = useState<any>(OPTIONS_DASHBOARD_PERIOD[0]);
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/admin/dashboard/insight/get-count-job-application`,
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner minH={"60px"} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData title={null} description={null} minH={""} />,
    loaded: <Stat stat={data} period={period} />,
  };

  return (
    <StatContainer title={"Job Applied"} period={period} setPeriod={setPeriod}>
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

        <BlogViews />

        <JobApplied />
      </HStack>
    </CContainer>
  );
};

export default DashboardPage;
