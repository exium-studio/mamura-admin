import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackNotFound from "@/components/ui-custom/FeedbackNotFound";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import SearchInput from "@/components/ui-custom/SearchInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import DeleteStatus from "@/components/widget/DeleteStatus";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TableData = (props: any) => {
  // Props
  const { dataState } = props;
  const { data, pagination, limit, setLimit, page, setPage } = dataState;

  // Hooks
  const { l } = useLang();
  const { req, loading: deleteLoading } = useRequest({
    id: `crud_faq`,
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const ths = [
    {
      th: l.job_application_interface.name,
      sortable: true,
    },
    {
      th: l.job_application_interface.job_category,
      sortable: true,
    },
    {
      th: l.job_application_interface.resume,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.job_application_interface.employee_status,
      sortable: true,
    },
    {
      th: l.job_application_interface.job_location,
      sortable: true,
    },
    {
      th: l.job_application_interface.phone_number,
      sortable: true,
    },
    {
      th: l.job_application_interface.email,
      sortable: true,
    },
    {
      th: l.delete_status,
      sortable: true,
    },
  ];
  const tds = data?.map((item: any) => {
    return {
      originalData: item,
      columnsFormat: [
        {
          value: item?.name,
          td: item?.name,
        },
        {
          value: item?.carrier?.carrier_category?.name,
          td: item?.carrier?.carrier_category?.name,
        },
        {
          value: item?.resume,
          td: (
            <Link to={item?.resume?.[0]?.file_url}>
              <BButton
                colorPalette={themeConfig.colorPalette}
                variant={"ghost"}
              >
                {l.view}
              </BButton>
            </Link>
          ),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.carrier?.employee_status?.name,
          td: item?.carrier?.employee_status?.name,
        },
        {
          value: item?.carrier?.job_location?.name,
          td: item?.carrier?.job_location?.name,
        },
        {
          value: item?.phone_number,
          td: item?.phone_number,
        },
        {
          value: item?.email,
          td: item?.email,
        },
        {
          value: item?.deleted_at,
          td: item?.deleted_at ? (
            <DeleteStatus deletedAt={item?.deleted_at} />
          ) : (
            ""
          ),
          dataType: "date",
        },
      ],
    };
  });
  const rowOptions = [
    {
      label: "Delete",
      disabled: (rowData: any) => {
        return rowData.originalData.deleted_at;
      },
      menuItemProps: {
        color: "red.400",
      },
      confirmation: (rowData: any) => ({
        id: `${rowData.id}`,
        title: "Delete?",
        description: `${l.perma_delete_confirmation}`,
        confirmLabel: "Delete",
        confirmButtonProps: {
          colorPalette: "red",
        },
        loading: deleteLoading,
        confirmCallback: () => {
          back();

          const url = `/api/mamura/admin/job-application/${rowData.originalData.id}`;
          const config = {
            url,
            method: "DELETE",
          };

          req({
            config,
            onResolve: {
              onSuccess: () => {
                setRt(!rt);
              },
            },
          });
        },
      }),
    },
  ];

  return (
    <TableComponent
      ths={ths}
      tds={tds}
      originalData={data}
      rowOptions={rowOptions}
      limitControl={limit}
      setLimitControl={setLimit}
      pageControl={page}
      setPageControl={setPage}
      pagination={pagination}
    />
  );
};

const JobApplicationPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/job-application`,
    method: "GET",
    payload: {
      search: filterConfig.search,
    },
    dependencies: [filterConfig, rt],
  });
  const { data, initialLoading, error, makeRequest } = dataState;
  const render = {
    loading: <ComponentSpinner flex={1} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    notFound: <FeedbackNotFound />,
    loaded: <TableData dataState={dataState} />,
  };

  return (
    <CContainer flex={1} overflowY={"auto"} p={4} pt={0}>
      <ItemContainer flex={1} overflowY={"auto"}>
        <ItemHeaderContainer borderless>
          <HStack py={2} justify={"space-between"} w={"full"}>
            <SearchInput
              onChangeSetter={(input) => {
                setFilterConfig({
                  ...filterConfig,
                  search: input,
                });
              }}
              inputValue={filterConfig.search}
            />
          </HStack>
        </ItemHeaderContainer>

        {initialLoading && render.loading}
        {!initialLoading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}

                {!data && render.empty}
              </>
            )}
          </>
        )}
      </ItemContainer>
    </CContainer>
  );
};

export default JobApplicationPage;
